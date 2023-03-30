import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Transactional, transactionHandle } from './transaction';

import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource('DATA_SOURCE')
    private userSource: DataSource,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userSource.manager.find(User);
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userSource.manager.findOneBy(User, { id });
  }

  async remove(id: number): Promise<void> {
    await this.userSource.manager.delete(User, { id });
  }

  // @Transactional()
  async create(payload: Partial<User>): Promise<Partial<User>> {
    // return await transactionHandle().manager.save(User, payload);
    return await this.userSource.manager.save(User, payload);
  }
}
