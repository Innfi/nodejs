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

    channel.assertQueue(queue, { durable: false });

    channel.consume(queue, (msg: amqp.Message | null) => {
      const rawData: string = msg?.content.toString()!;
      const payload = JSON.parse(rawData) as Payload;

      console.log(`type: ${payload.payloadType}`);
      console.log(`data: ${payload.data}`);
    }, { noAck: true });
  });
});