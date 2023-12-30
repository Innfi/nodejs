import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  pass: string;

  @Column()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}