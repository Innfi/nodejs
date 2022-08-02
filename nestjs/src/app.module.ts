import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookEntity } from './db/book.entity';
import { GenreEntity } from './db/genre.entity';
import { UserEntity } from './db/user.entity';
import { BookModule } from './book/book.module';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UserModule,
    BookModule,
    GenreModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'initial',
      entities: [UserEntity, GenreEntity, BookEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
