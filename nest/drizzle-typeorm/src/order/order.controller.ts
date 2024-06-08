import { Body, Controller, Get, Logger, Param, Patch, Post, Query } from '@nestjs/common';

import {
  CreateOrderPayload,
  CreateOrderResult,
  FindOrderParams,
  FindOrdersResult,
  UpdateOrderPayload,
  UpdateOrderResult,
} from './payload';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(readonly service: OrderService) {}

  @Post()
  async createOrder(@Body() payload: CreateOrderPayload): Promise<CreateOrderResult> {
    Logger.log(`createOrder] payload: ${JSON.stringify(payload)}`);

    return await this.service.createOrder(payload);
  }

  @Get()
  async findOrders(@Query() query: FindOrderParams): Promise<FindOrdersResult> {
    Logger.log(`findOrders] query: ${JSON.stringify(query)}`);

    return await this.service.findOrders(query);
  }

  @Patch(':orderId')
  async patchOrder(
    @Param('orderId') orderId: number,
    @Body() payload: UpdateOrderPayload,
  ): Promise<UpdateOrderResult> {
    Logger.log(`patchOrder] id: ${orderId}, payload: ${JSON.stringify(payload)}`);

    return await this.service.updateOrder(orderId, payload);
  }
}
