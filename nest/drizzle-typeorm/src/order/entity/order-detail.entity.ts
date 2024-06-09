import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity({ name: 'order_details' })
export class OrderDetail {
  @PrimaryColumn({ type: 'integer' })
  public orderId: number;

  @PrimaryColumn({ type: 'integer' })
  public productId: number;

  @Column({ type: 'integer' })
  public quantity: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  public order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  public product: Product;
}
