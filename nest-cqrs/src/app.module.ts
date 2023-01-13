import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      replication: {
        master: {
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'innfisdb',
        },
        slaves: [
          {
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'innfisdb',
          },
        ],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
