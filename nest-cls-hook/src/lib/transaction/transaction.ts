import { EntityManager } from 'typeorm';
import { createNamespace } from 'cls-hooked';
import { defaultDataSource } from '../../database/database.providers';


const ENTITY_MANAGER = 'namespaces/entity-manager';

const transactionNs = createNamespace('transaction');
 export const transactionHandle = (): EntityManager => 
   transactionNs.active ? transactionNs.get(ENTITY_MANAGER) : defaultDataSource.manager;

export const Transactional = (): MethodDecorator => {
  return function (target: any, _propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;

    async function transactionRunner(...args: unknown[]): Promise<any> {
      let result: unknown = null;

      return transactionNs.runAndReturn(async () => {
        const entityManager = transactionNs.get(ENTITY_MANAGER);

        if (!entityManager) {
          const dataSource = defaultDataSource;
          const queryRunner = dataSource.createQueryRunner();

          await queryRunner.connect();
          await queryRunner.startTransaction();
          console.log(`before transaction] `);
          try {
            transactionNs.set(ENTITY_MANAGER, queryRunner.manager);

            result = await originalMethod.apply(this, [...args]);

            await queryRunner.commitTransaction();
          } catch (err) {
            console.log(`rollback transaction] `);
            queryRunner.rollbackTransaction();
            throw err;
          } finally {
            console.log(`after transaction] `);
            queryRunner.release();
          }

        } else {
          result = await originalMethod.apply(this, [...args]);
        }

        return result;
      });      
    }

    descriptor.value = transactionRunner;
  };
};