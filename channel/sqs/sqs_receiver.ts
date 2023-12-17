import AWS from 'aws-sdk';
import dotenv from 'dotenv';


dotenv.config();

AWS.config.credentials = new AWS.SharedIniFileCredentials(
    { profile: process.env.PROFILE}
);

AWS.config.update({ region: process.env.REGION});

const sqs = new AWS.SQS({ apiVersion: '2012-11-05'});

const params: AWS.SQS.ReceiveMessageRequest = {
    VisibilityTimeout: 20,
    QueueUrl: process.env.QUEUE_URL,
    AttributeNames: [
        "SendTimestamp"
    ],
    MessageAttributeNames: [
        "All"
    ],
    WaitTimeSeconds: 5
};

console.log('before call receiveMessage()');

sqs.receiveMessage(params, (err: AWS.AWSError, data: AWS.SQS.ReceiveMessageResult) => {
    if(err) {
        console.log(`err: ${err}`);
        return;
    }

    if(data.Messages === undefined) {
        console.log(`message not arrived`);
        return;
    }

    console.log(`messages: ${JSON.stringify(data.Messages)}`);

    const deleteParams: AWS.SQS.DeleteMessageRequest = {
        QueueUrl: process.env.QUEUE_URL,
        ReceiptHandle: data.Messages[0].ReceiptHandle
    };

    sqs.deleteMessage(deleteParams, (err: AWS.AWSError, data: {}) => {
        if(err) console.log(`delete error: ${err}`);
        else console.log(`deleted: ${data}`);
    });
});
