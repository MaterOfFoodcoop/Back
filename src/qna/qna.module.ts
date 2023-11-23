import { Module } from '@nestjs/common';
import { QnAController } from './qna.controller';
import { QnaService } from './qna.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  controllers: [QnAController],
  providers: [QnaService],
})
export class QnAModule {}
