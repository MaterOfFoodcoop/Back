import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class QnaService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const question = new Question();
    question.title = createQuestionDto.title;
    question.content = createQuestionDto.content;
    return await this.questionRepository.save(question);
  }

  async createAnswer(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const question = await this.questionRepository.findOne({
      where: { id: createAnswerDto.questionId },
    });
    if (!question) {
      throw new NotFoundException(
        `해당 id(${createAnswerDto.questionId}) 를 가진 질문이 존재하지 않습니다.`,
      );
    }
    const answer = this.answerRepository.create({
      content: createAnswerDto.content,
      question,
    });
    await this.answerRepository.save(answer);
    return answer;
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find({ relations: ['answer'] });
  }
}
