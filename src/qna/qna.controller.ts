import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QnaService } from './qna.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('qna')
export class QnAController {
  constructor(private readonly qnaService: QnaService) {}

  @Post('question')
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.qnaService.createQuestion(createQuestionDto);
  }

  @UseGuards('jwt')
  @Post('answer')
  async createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    return await this.qnaService.createAnswer(createAnswerDto);
  }

  @Get()
  findAll() {
    return this.qnaService.findAll();
  }
}
