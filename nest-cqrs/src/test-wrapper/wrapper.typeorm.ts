import { Injectable } from "@nestjs/common";
import { DataSource, EntityTarget, ObjectType, QueryRunner } from "typeorm";

type DeepPartial<T> = T | 
  (T extends Array<infer U> ? 
    DeepPartial<U>[] : 
    T extends Map<infer K, infer V> ? 
      Map<DeepPartial<K>, DeepPartial<V>> : 
      T extends Set<infer M> ? 
        Set<DeepPartial<M>> : T extends object ? {
          [K in keyof T]?: DeepPartial<T[K]>;
        } : T
  );

interface WrapperBase {
  create<T>(payload: DeepPartial<T>): Promise<T>;
}

@Injectable()
export class WrapperTypeORM implements WrapperBase {
  readonly runner: QueryRunner;

  constructor(input: DataSource) {
    this.runner = input.createQueryRunner();
  }

  async create<T>(payload: DeepPartial<T>): Promise<T> {
    const target: EntityTarget<T> = payload as ObjectType<T>;

    return await this.runner.manager.create(target, payload);
  }
}