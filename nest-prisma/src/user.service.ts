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
  constructor(private prisma: PrismaService) {
    this.initLogging();
  }

  private initLogging() {
    // TODO: how to set log param?

    // this.prisma.$on('query', (e) => {
    //   console.log('Query: ' + e.query)
    //   console.log('Params: ' + e.params)
    //   console.log('Duration: ' + e.duration + 'ms')
    // });
  }

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

  async userTransaction1(params: {
    userWhere: Prisma.UserWhereUniqueInput;
    userData: Prisma.UserUpdateInput;
    productWhere: Prisma.ProductWhereUniqueInput;
    productData: Prisma.ProductUpdateInput;
  }): Promise<any> {
    const { userWhere, userData, productWhere, productData } = params;

    return await this.prisma.$transaction([
      // no await inside transaction?
      this.prisma.user.update({ where: userWhere, data: userData }),
      this.prisma.product.update({ where: productWhere, data: productData}),
    ]);
  }

  async userTransaction2(params: {
    userWhere: Prisma.UserWhereUniqueInput;
    userData: Prisma.UserUpdateInput;
    productWhere: Prisma.ProductWhereUniqueInput;
    productData: Prisma.ProductUpdateInput;
  }): Promise<any> {
    const { userWhere, userData, productWhere, productData } = params;

    return await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const updateResult = await this.prisma.user.update({ where: userWhere, data: userData });

      if (!updateResult) return;

      await this.prisma.product.update({ where: productWhere, data: productData});
    });
  }

  async deleteUserByRawQuery(params: {
    userWhere: Prisma.UserDeleteArgs;
  }): Promise<void> {
    await this.prisma.$executeRaw `delete from User where id=${params.userWhere.where}`;
  }


}