import AWS from 'aws-sdk';
import dotenv from 'dotenv';


dotenv.config();

AWS.config.credentials = new AWS.SharedIniFileCredentials(
    { profile: process.env.PROFILE}
);

AWS.config.update({ region: process.env.REGION});

const sqs = new AWS.SQS({ apiVersion: '2012-11-05'});

const params: AWS.SQS.SendMessageRequest = {
    DelaySeconds: 10,
    MessageBody: 'test message from sender',
    MessageAttributes: {
        "Title": {
            DataType: "String",
            StringValue: "The Whistler"
        },
        "Author": {
            DataType: "String",
            StringValue: "John Grisham"
        },
        "WeeksOn": {
            DataType: "Number",
            StringValue: "6"
        }
    }, 
    QueueUrl: process.env.QUEUE_URL
};

sqs.sendMessage(params, (err: AWS.AWSError, data: AWS.SQS.SendMessageResult) => {
    if(err) console.log(`error: ${err}`);
    else console.log(`success: ${data.MessageId}`);
});