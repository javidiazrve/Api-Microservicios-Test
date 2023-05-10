import { Test, TestingModule } from '@nestjs/testing';
import { NegocioController } from './negocio.controller';
import { NegocioService } from './negocio.service';

describe('NegocioController', () => {
  let negocioController: NegocioController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NegocioController],
      providers: [NegocioService],
    }).compile();

    negocioController = app.get<NegocioController>(NegocioController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(negocioController.getHello()).toBe('Hello World!');
    });
  });
});
