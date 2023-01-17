import { Controller, Get, Param } from "@nestjs/common";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  async getOrder(@Param('id') id: Readonly<number>): Promise<Order> {
    return await this.orderService.getOrder(id);
  }
}