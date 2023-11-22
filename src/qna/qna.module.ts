import { Module } from '@nestjs/common';
import { QnAController } from './qna.controller';
import { QnaService } from './qna.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QnAController],
  providers: [QnaService],
})
export class QnAModule {}
