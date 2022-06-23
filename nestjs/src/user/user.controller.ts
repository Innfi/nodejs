import { Body, Controller, Get, ParseIntPipe, Post } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('post')
  postUser(@Body() user: CreateUserDto) {
    return this.userService.insert(user);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('books')
  getBooks(@Body('userId', ParseIntPipe) userId: number) {
    return this.userService.getBooksOfUser(userId);
  }
}