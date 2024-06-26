import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'innfi',
  entities: ['src/**/**.entity.ts'],
  synchronize: true,
  migrations: ['src/db/migrations/*.ts'],
  migrationsTableName: 'innfi'
});