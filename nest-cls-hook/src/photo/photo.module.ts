import { Module } from '@nestjs/common';
import { SqsConfig, SqsModule, SqsQueueType } from '@nestjs-packages/sqs';
import { DatabaseModule } from '../database/database.module';
import { photoProviders } from './photo.providers';
import { PhotoService } from './photo.service';

const endpoint = process.env.SQS_ENDPOINT? process.env.SQS_ENDPOINT :
  'https://sqs.us-east1.amazonaws.com';

@Module({
  imports: [
    DatabaseModule,
    SqsModule.forRootAsync({
      useFactory: () => {
        return new SqsConfig({
          region: process.env.AWS_REGION,
          accountNumber: process.env.ACC_NUMBER,
          endpoint,
          credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY
          },
        });
      },
    }),
    SqsModule.registerQueue({
      name: 'test-queue',
      type: SqsQueueType.Consumer,
      consumerOptions: {
        messageAttributeNames: ['test-attr', 'others']
      },
    }),
  ],
  providers: [
    ...photoProviders,
    PhotoService,
  ],
  exports: [PhotoService]
})
export class PhotoModule {}