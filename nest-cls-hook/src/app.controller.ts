import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { User } from './user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async addUser(@Body() payload: Partial<User>): Promise<Partial<User>> {
    return await this.appService.create(payload);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.appService.findOne(id);
  }
}
