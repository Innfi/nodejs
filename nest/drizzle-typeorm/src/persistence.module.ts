import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';

import * as drizzleSchema from './db/drizzle/schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'innfi',
      entities: [__dirname + '/../**/**.entity.{ts,js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    DrizzleMySqlModule.register({
      tag: 'Drizzle',
      mysql: {
        connection: 'pool',
        config: {
          host: 'localhost',
          port: 3306,
          user: 'root',
          password: 'root',
          database: 'innfi',
        },
      },
      config: {
        mode: 'default',
        schema: { ...drizzleSchema },
      },
    }),
  ],
})
export class PersistenceModule {}
