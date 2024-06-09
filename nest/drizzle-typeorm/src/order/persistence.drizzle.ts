import { Inject, Injectable, Logger } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as drizzleSchema from '../db/drizzle/schema';

@Injectable()
export class PersistenceDrizzleOrm {
  constructor(@Inject('Drizzle') private drizzleSource: MySql2Database<typeof drizzleSchema>) {}

  async findOrderDetail(id: number) {
    Logger.log(`id: ${id}`);

    const result = await this.drizzleSource.query.orders.findFirst();

    return result;
  }
}
