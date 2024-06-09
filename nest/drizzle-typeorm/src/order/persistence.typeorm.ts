import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { FindOrderParams } from './payload';
import { Order } from './entity/order.entity';

@Injectable()
export class PersistenceTypeOrm {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  public async findOrderById(query: FindOrderParams): Promise<[Order[], number]> {
    const { country, postalCode } = query;

    const selectQuery = this.dataSource.manager.createQueryBuilder(Order, 'order');
    if (country) {
      selectQuery.andWhere('order.shipCountry = :country', { country });
    }
    if (postalCode) {
      selectQuery.andWhere('order.shipPostalCode = :postalCode', { postalCode });
    }

    Logger.log(`findOrderById] selectQuery: ${selectQuery.getSql()}`);

    return await selectQuery.getManyAndCount();
  }

  public async findOrderDetail(id: number): Promise<Order> {
    const selectQuery = this.dataSource.manager
      .createQueryBuilder(Order, 'order')
      .innerJoinAndSelect('order.orderDetails', 'detail')
      .innerJoinAndSelect('detail.product', 'product')
      .where('order.id = :id', { id });

    Logger.log(`findOrderDtail] selectQuery: ${selectQuery.getSql()}`);

    return await selectQuery.getOne();
  }
}
