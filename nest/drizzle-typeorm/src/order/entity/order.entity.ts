import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetail } from './order-detail.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'date' })
  public orderDate: Date;

  @Column({ type: 'date', nullable: true })
  public shippedDate: Date;

  @Column({ type: 'text' })
  public shipAddress: string;

  @Column({ type: 'text', nullable: true })
  public shipPostalCode: string;

  @Column({ type: 'text' })
  public shipCountry: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  public orderDetails: OrderDetail[];
}
