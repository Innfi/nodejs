import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: false,
    }),
  ],
})
export class PersistenceModule {}
