import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order, ORDER_WRITE_EVENT } from './order.entity';
import { OrderDoc, OrderDocument } from './test.schema';


@Injectable()
export class OrderEventService {
  constructor(
    @InjectModel(OrderDoc.name) private orderDocModel: Model<OrderDocument>,
  ) {}

  @OnEvent(ORDER_WRITE_EVENT, { async: true })
  async handleEvent(payload: Readonly<Order>): Promise<void> {
    console.log(`OrderEventService.handleEvent] ${JSON.stringify(payload)}`);

    await this.orderDocModel.create(payload);
  }
}
