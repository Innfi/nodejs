import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: Readonly<UserDto>): Promise<User> {
    return await this.userService.addUser(dto);
  }

  @Get('/:email')
  async getUser(@Param('email') email: Readonly<string>): Promise<User> {
    return await this.userService.getUser(email);
  }

  @Get('/deco')
  runDeco(@Param('email') email: string): string {
    return this.userService.runDeco(email);
  }
}
