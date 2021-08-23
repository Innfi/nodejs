import { createClient } from 'redis';


const subs = createClient();

subs.on('subscribe', (channel: string, count: number) => {
    console.log(`channel: ${channel}, count: ${count}`);
});

subs.on('message', (channel: string, message: string) => {
    console.log(`message] channel: ${channel}, message: ${message}`);
});

subs.subscribe('testChannel');