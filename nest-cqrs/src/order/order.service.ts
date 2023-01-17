import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductDto } from './dto';

import { Order, OrderItem } from './order.entity';
import { Product } from './product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async addProduct(dto: Readonly<ProductDto>): Promise<Product> {
    const { name, comment } = dto;

    const insertQuery = this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values({ name, comment });

    const result = await insertQuery.execute();

    return result.generatedMaps[0] as Product;
  }

  async getProduct(name: Readonly<string>): Promise<Readonly<Product>> {
    const selectQuery = this.dataSource
      .createQueryBuilder(Product, 'product')
      .select(['product.id, product.name, product.comment'])
      .where('product.name = :name', { name });

    return await selectQuery.getOne();
  }

  // async addOrder()

  async getOrder(id: Readonly<number>): Promise<Readonly<Order>> {
    const selectQuery = this.dataSource
      .createQueryBuilder(Order, 'order')
      .addSelect(['order.id', 'order.name'])
      .innerJoinAndSelect(OrderItem, 'items')
      .where('order.id = :id', {id});
    
    return await selectQuery.getOne();
  }
}