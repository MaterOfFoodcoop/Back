import { Test, TestingModule } from '@nestjs/testing';
import { QnAController } from './qna.controller';

describe('QnAController', () => {
  let controller: QnAController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QnAController],
    }).compile();

    controller = module.get<QnAController>(QnAController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
