import { Order } from './entity/order.entity';

export interface CreateOrderPayload {}

export interface CreateOrderResult {
  result: string;
  order?: Order;
}

export interface FindOrderParams {
  country?: string;
  postalCode?: string;
}

export interface FindOrdersResult {
  result: string;
  orders?: Order[];
  len: number;
}

export interface FindOrderDetailResult {
  result: string;
  order?: Order;
}

export interface UpdateOrderPayload {}

export interface UpdateOrderResult {
  result: string;
  order?: Order;
}
