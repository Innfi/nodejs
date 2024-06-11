import { Inject, Injectable, Logger } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';

import * as drizzleSchema from '../db/drizzle/schema';

type Order = typeof drizzleSchema.orders.$inferSelect;

// https://orm.drizzle.team/docs/joins
// https://github.com/drizzle-team/drizzle-orm/blob/main/docs/joins.md

/** is this mandatory?......

  import { InferModel } from 'drizzle-orm';

  type User = InferModel<typeof users>;
  type City = InferModel<typeof cities>;

  const rows = await db
    .select({
      city: cities,
      user: users,
    })
    .from(cities)
    .leftJoin(users, eq(users.cityId, cities.id));

  const result = rows.reduce<Record<number, { city: City; users: User[] }>>(
    (acc, row) => {
      const city = row.city;
      const user = row.user;

      if (!acc[city.id]) {
        acc[city.id] = { city, users: [] };
      }

      if (user) {
        acc[city.id].users.push(user);
      }

      return acc;
    },
    {},
  );

 */

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
