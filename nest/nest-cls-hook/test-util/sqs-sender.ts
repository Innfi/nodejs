import { SQSClient, SendMessageCommand, SendMessageRequest, SendMessageResult } from '@aws-sdk/client-sqs';

const client = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
  },
});

const payload: SendMessageRequest = {
  MessageBody: 'hello',
  MessageAttributes: {
    'test-attr': {
      DataType: 'String',
      StringValue: 'test string value'
    }
  },
  QueueUrl: process.env.SQS_URL
};

const run = async () => {
  const sendResult: SendMessageResult = await client.send(new SendMessageCommand(payload));
};

run();