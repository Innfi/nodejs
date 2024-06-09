import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PersistenceTypeOrm } from './persistence.typeorm';
import { PersistenceDrizzleOrm } from './persistence.drizzle';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, PersistenceTypeOrm, PersistenceDrizzleOrm],
})
export class OrderModule {}
