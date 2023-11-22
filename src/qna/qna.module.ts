import { Module } from '@nestjs/common';
import { QnAController } from './qna.controller';
import { QnaService } from './qna.service';

@Module({
  controllers: [QnAController],
  providers: [QnaService],
})
export class QnAModule {}
