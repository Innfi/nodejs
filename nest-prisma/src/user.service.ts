import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

import { PrismaService } from './prisma.service';

interface FindManyParam {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput,
  orderBy?: Prisma.UserOrderByWithRelationInput,
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    input: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({ where: input });
  }

  async findMany(params: FindManyParam): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({ data, where });
  }
}