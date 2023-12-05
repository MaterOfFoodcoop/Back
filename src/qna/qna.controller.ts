import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QnaService } from './qna.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('QNA API')
@Controller('qna')
export class QnAController {
  constructor(private readonly qnaService: QnaService) {}

  @ApiOperation({
    summary: '질문 작성 API',
    description: 'QNA에 질문을 작성한다.',
  })
  @ApiParam({ name: 'id', description: '상품 ID' })
  @ApiOkResponse({ description: '질문 작성 성공' })
  @ApiBody({ type: CreateQuestionDto })
  @Post('question')
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.qnaService.createQuestion(createQuestionDto);
  }

  @ApiOperation({
    summary: '답변 작성 API',
    description: 'QNA에 답변을 작성한다.',
  })
  @ApiBody({ type: CreateAnswerDto })
  @ApiOkResponse({ description: '답변 작성 성공' })
  @UseGuards(AuthGuard('jwt'))
  @Post('answer')
  async createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    return await this.qnaService.createAnswer(createAnswerDto);
  }

  @ApiOperation({
    summary: 'QNA 조회 API',
    description: '전체 QNA를 조회한다.',
  })
  @ApiOkResponse({ description: 'QNA 조회 성공' })
  @Get()
  findAll() {
    return this.qnaService.findAll();
  }
}
