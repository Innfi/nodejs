import { Response } from 'express';
import { Body, Controller, Get, ParseIntPipe, Post, Res,
} from "@nestjs/common";

import { UserEntity } from '../db/user.entity';
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async postUser(@Body() input: CreateUserDto, @Res() res: Response) {
    console.log(`/users] ${JSON.stringify(input)}`);

    await this.userService.insert(input);

    return res.status(200).send({ err: 'ok' });
  }

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Get('books')
  async getBooks(@Body('userId', ParseIntPipe) userId: number) {
    return this.userService.getBooksOfUser(userId);
  }
}