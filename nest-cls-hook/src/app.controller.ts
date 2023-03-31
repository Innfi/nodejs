import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PhotoService } from './photo/photo.service';
import { Photo } from './photo/photo.entity';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
 
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  async postPhoto(@Body() payload: Partial<Photo>): Promise<any> {
    return await this.photoService.createPhoto(payload);
  }

  @Get(':id')
  async getPhoto(@Param('id') id: number): Promise<Photo> {
    return await this.photoService.findOne(id);
  }
}
