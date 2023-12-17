import { Module } from '@nestjs/common';
import { dataSourceProviders } from './database.providers';

@Module({
  providers: [...dataSourceProviders],
  exports: [...dataSourceProviders],
})
export class DatabaseModule {}