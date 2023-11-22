import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QnaService } from './qna.service';

@Controller('qna')
export class QnAController {
  constructor(private readonly qnaService: QnaService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.qnaService.create(createQuestionDto);
  }
}
