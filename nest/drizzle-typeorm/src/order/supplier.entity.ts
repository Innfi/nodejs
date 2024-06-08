import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'suppliers' })
export class Supplier {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'text' })
  public companyName: string;

  @Column({ type: 'text', nullable: true })
  public city: string;

  @Column({ type: 'text' })
  public country: string;

  @OneToMany(() => Product, (product) => product.supplier)
  public products: Product[];
}
