import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersistenceModule } from './persistence.module';
import { OrderModule } from './order/order.modules';

@Module({
  imports: [PersistenceModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
