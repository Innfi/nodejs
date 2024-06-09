import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { Supplier } from './supplier.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'text' })
  public name: string;

  @Column({ type: 'integer' })
  public supplierId: number;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  public unitPrice: number;

  @Column({ type: 'integer' })
  public unitsInStock: number;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  public orderDetails: OrderDetail[];

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @JoinColumn({ name: 'supplierId', referencedColumnName: 'id' })
  public supplier: Supplier;
}
