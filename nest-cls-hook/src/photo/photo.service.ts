import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { defaultDataSource } from 'src/database/database.providers';
import { Transactional, transactionHandle } from 'src/transaction';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private photoRepository: Repository<Photo>,
  ) {}

  @Transactional()
  async createPhoto(payload: Partial<Photo>): Promise<Photo> {
    return await transactionHandle().save(Photo, payload);
    // return await this.photoRepository.save(payload);
  }

  async findOne(id: number): Promise<Photo> {
    return await defaultDataSource.manager.findOne(Photo, { where: { id }});
    // return await this.photoRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }
}