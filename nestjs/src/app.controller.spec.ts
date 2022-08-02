import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
      ]
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  describe('root', () => {
    it('controller should return "Hello World!"', async () => {
      expect(await appController.getHello()).toBe('Hello World!');
    });

    it('service returns same as controller', async () => {
      expect(await appService.getHello()).toBe('Hello World!');
    });
  });
});
