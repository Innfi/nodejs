import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Order } from './order.entity';
import { OrderEventService } from './order.event';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDocumentSchema } from './test.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderDocumentSchema }
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderEventService],
})
export class OrderModule {}
