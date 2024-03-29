import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from './photo/photo.module';
import { PhotoService } from './photo/photo.service';

@Module({
  imports: [PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
