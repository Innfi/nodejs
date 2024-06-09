import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateOrderPayload,
  CreateOrderResult,
  FindOrderDetailResult,
  FindOrderParams,
  FindOrdersResult,
  UpdateOrderPayload,
  UpdateOrderResult,
} from './payload';
import { PersistenceTypeOrm } from './persistence.typeorm';

@Injectable()
export class OrderService {
  constructor(private readonly persistence: PersistenceTypeOrm) {}

  async createOrder(payload: CreateOrderPayload): Promise<CreateOrderResult> {
    return {
      result: 'err',
    };
  }

  async findOrders(query: FindOrderParams): Promise<FindOrdersResult> {
    try {
      const [orders, len] = await this.persistence.findOrderById(query);

      if (len <= 0) return { result: 'ok', len: 0 };

      return {
        result: 'ok',
        orders,
        len,
      };
    } catch (err: unknown) {
      Logger.error((err as Error).stack);

      throw new InternalServerErrorException();
    }
  }

  async findOrderDetail(id: number): Promise<FindOrderDetailResult> {
    const order = await this.persistence.findOrderDetail(id);
    if (!order) throw new NotFoundException();

    return {
      result: 'ok',
      order,
    };
  }

  async updateOrder(orderId: number, payload: UpdateOrderPayload): Promise<UpdateOrderResult> {
    return {
      result: 'err',
    };
  }
}
