import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('user')
  async createUser(@Body() dto: Readonly<UserDto>): Promise<any> {
    return await this.appService.addUser(dto);
  }

  @Get('user/:email')
  async getUser(@Param('email') email: Readonly<string>): Promise<User> {
    return await this.appService.getUser(email);
  }
}
