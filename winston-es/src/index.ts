import express, { Request, Response } from 'express';
import winston from 'winston';
import { 
  ElasticsearchTransport, 
  ElasticsearchTransportOptions,
} from 'winston-elasticsearch';

const esTransportOptions: ElasticsearchTransportOptions = {
  level: 'info',
  clientOpts: { node: 'http://localhost:9200' }
};
const esTransport = new ElasticsearchTransport(esTransportOptions);
const logger = winston.createLogger({
  transports: [ esTransport ]
});

//logger.on('info', ())

const app = express();

app.get('/', (req: Request, res: Response) => {
  logger.info(`req params: ${req.params}`);

  res.status(200).send({ err: 'ok' }).end();
});

app.listen(1330, () => {
  logger.info('starts listening at 1330');
});