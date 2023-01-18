import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderEventService } from './order.event';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderEventService],
})
export class OrderModule {}
