import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { BookEntity } from './db/book.entity';
import { GenreEntity } from './db/genre.entity';
import { UserEntity } from './db/user.entity';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    BookModule,
    GenreModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'innfistest',
      entities: [UserEntity, GenreEntity, BookEntity],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
