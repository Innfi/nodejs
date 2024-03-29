import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('post user', async () => {
    return await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'innfi',
        books: ['this', 'is', 'list'],
      })
      .expect(200);
  });

  // it('get user', async () => {
  //   return await request(app.getHttpServer())
  //     .get('/users')
  //     .expect(200);
  // });
});
