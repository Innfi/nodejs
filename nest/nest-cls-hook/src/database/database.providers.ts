import { Photo } from 'src/photo/photo.entity';
import { DataSource } from 'typeorm';

export const defaultDataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'innfi',
        entities: [
          Photo,
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

export const dataSourceProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return defaultDataSource.initialize();
    },
  },
];