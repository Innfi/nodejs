import { DataSource, getConnection, getManager } from 'typeorm';
import { createNamespace } from 'cls-hooked';

const ENTITY_MANAGER = 'namespaces/entity-manager';

const transactionNs = createNamespace('transaction');
export const transactionHandle = (): DataSource => 
  transactionNs.active ? transactionNs.get(ENTITY_MANAGER) : getManager();

export const Transactional = (): MethodDecorator => {
  return function (target: any, _propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;

    async function transactionRunner(...args: unknown[]): Promise<any> {
      let result: unknown = null;

      return transactionNs.runAndReturn(async () => {
        const entityManager = transactionNs.get(ENTITY_MANAGER);

        if (!entityManager) {
          const dataSource = getConnection();
          const queryRunner = dataSource.createQueryRunner();

          await queryRunner.connect();
          await queryRunner.startTransaction();

          try {
            transactionNs.set(ENTITY_MANAGER, queryRunner.manager);

            result = await originalMethod.apply(this, [...args]);

            await queryRunner.commitTransaction();
          } catch (err) {
            queryRunner.rollbackTransaction();
            throw err;
          } finally {
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