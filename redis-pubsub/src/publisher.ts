import { createClient } from 'redis';

const pubs = createClient();

const msgData = {
    id: '123', 
    type: 2, 
    stringData: 'out'
};

pubs.publish('testChannel', JSON.stringify(msgData));