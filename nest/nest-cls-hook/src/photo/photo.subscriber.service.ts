import { Injectable, Logger } from '@nestjs/common';
import { SqsMessageHandler, SqsProcess } from '@nestjs-packages/sqs';

@Injectable()
@SqsProcess('test-queue')
export class PhotoSubscriberService {
  @SqsMessageHandler()
  public async handleSqsMessage(message: AWS.SQS.Message): Promise<void> {
    const messageAttrName = 'test-attr';
    const messageAttr: AWS.SQS.MessageAttributeValue = message.MessageAttributes[messageAttrName];

    Logger.debug(`handleSqsmessage] body: ${message.Body}`);
    Logger.debug(`message attribute: ${JSON.stringify(messageAttr)}`);
  }
}