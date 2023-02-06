import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDto } from './user.dto';
import { User } from './user.entity';
import { TestUserDecorator } from './user.decorator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async addUser(dto: Readonly<UserDto>): Promise<User> {
    const insertQuery = this.userRepo
      .createQueryBuilder('user')
      .insert()
      .values({
        email: dto.email,
        company: dto.company,
      });

    const result = await insertQuery.execute();

    return result.generatedMaps[0] as User;
  }

  async getUser(email: Readonly<string>): Promise<Readonly<User>> {
    const selectQuery = this.userRepo
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.company', 'user.created'])
      .where('user.email = :email', { email });

    return await selectQuery.getOne();
  }

  @TestUserDecorator()
  runDeco(email: string): string {
    return `email: ${email}`;
  }
}
