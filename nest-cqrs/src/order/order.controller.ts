import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ProductDto } from './dto';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  async getOrder(@Param('id') id: Readonly<number>): Promise<Order> {
    return await this.orderService.getOrder(id);
  }

  @Post()
  async createOrder(): Promise<void> {

  }

  @Post('product')
  async createProduct(@Body() dto: Readonly<ProductDto>): Promise<Product> {
    return await this.orderService.addProduct(dto);
  }
}
