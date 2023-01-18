import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { Order, ORDER_WRITE_EVENT } from './order.entity';

@Injectable()
export class OrderEventService {
  constructor() {}

  @OnEvent(ORDER_WRITE_EVENT, { async: true })
  async handleEvent(payload: Readonly<Order>): Promise<void> {
    // TODO
  }
}
