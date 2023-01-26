import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { ProductDto } from '../src/order/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/user ', () => {
    const result = request(app.getHttpServer()).post('/user').send({
      email: 'test@innfi.com',
      company: 'ennfisnode',
    });
    result.expect({
      id: 1,
      email: 'test@innfi.com',
      company: 'ennfisnode',
    });

    // return request(app.getHttpServer())
    //   .get('/user')
    //   .expect
  });

  it('/product', async () => {
    const createDto: ProductDto = {
      name: 'mug',
      comment: 'just a mug'
    };

    const response = await request(app.getHttpServer()).post('/order/product').send(createDto);
    console.log(`data: ${response.body.data}`);
  });
});
