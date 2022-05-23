import amqp from 'amqplib/callback_api';

const url = 'amqp://localhost';

type Desc = 'desc1' | 'desc2' | 'desc3';

interface Payload {
  payloadType: Desc;
  data: string;
}

amqp.connect(url, (err: any, connection: amqp.Connection) => {
  if (err) {
    console.log(`connect error: ${(err as Error).stack}`);
    throw err;
  }

  console.log(`connected `);

  connection.createChannel((channelErr: any, channel: amqp.Channel) => {
    if (channelErr) {
      console.log(`createChannel error: ${(channelErr as Error).stack}`);
      throw channelErr;
    }

    const queue = 'first_queue';
    const payload: Payload = {
      payloadType: 'desc2',
      data: 'dummy data',
    };
    const buffer: Buffer = Buffer.from(JSON.stringify(payload));

    channel.assertQueue(queue, { durable: false });
    const sendResult = channel.sendToQueue(queue, buffer);

    console.log(`sendResult: ${sendResult}`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 1000);
  });
});