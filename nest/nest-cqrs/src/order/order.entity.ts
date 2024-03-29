import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Product } from './product.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => OrderItem, (item) => item.orderId)
  items: OrderItem[];

  @Column()
  userId: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

@Entity({ name: 'orderItems' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @Column()
  productId: number;

  @OneToMany(() => Product, (product) => product.id)
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  product: Product;

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn([ { name: 'userId', referencedColumnName: 'id' } ])
  user: User;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

export const ORDER_WRITE_EVENT = 'Order.Write';
