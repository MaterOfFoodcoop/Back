import { IsString, MaxLength, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @MaxLength(800)
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  questionId: number;
}
