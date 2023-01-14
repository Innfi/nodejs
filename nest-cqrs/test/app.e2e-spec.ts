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
});
