import { Injectable } from '@nestjs/common';

import { BookEntity } from '../db/book.entity';
import { UserEntity } from '../db/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const { name } = userDetails; 
    userEntity.name = name;
    await UserEntity.save(userEntity);
    return userEntity;
  }

  async getUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async getBooksOfUser(userId: number): Promise<BookEntity[]> {
    const user: UserEntity = await UserEntity.findOne({
      where: { id: userId },
      relations: ['books'],
    });

    return user.books;
  }
}
