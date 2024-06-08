import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PersistenceTypeOrm } from './persistence.typeorm';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, PersistenceTypeOrm],
})
export class OrderModule {}
