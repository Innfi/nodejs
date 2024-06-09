import { Inject, Injectable, Logger } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';

import * as drizzleSchema from '../db/drizzle/schema';

type Order = typeof drizzleSchema.orders.$inferSelect;

// https://orm.drizzle.team/docs/joins

@Injectable()
export class PersistenceDrizzleOrm {
  constructor(@Inject('Drizzle') private drizzleSource: MySql2Database<typeof drizzleSchema>) {}

  async findOrderDetail(id: number) {
    Logger.log(`id: ${id}`);

    const result = await this.drizzleSource
      .select()
      .from(drizzleSchema.orders)
      .innerJoin(
        drizzleSchema.order_details,
        eq(drizzleSchema.orders.id, drizzleSchema.order_details.orderId),
      )
      .innerJoin(
        drizzleSchema.products,
        eq(drizzleSchema.order_details.productId, drizzleSchema.products.id),
      )
      .where(eq(drizzleSchema.orders.id, id));

    return result;
  }
}
