import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user/:userName')
  async getUser(@Param('userName') userName: string) {
    return await this.appService.getUser(userName);
  }

  @Post('/user')
  async addUser(@Body() body: User) {
    return await this.appService.addUser(body);
  }
}
