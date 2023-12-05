import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty()
  @IsString()
  @MaxLength(800)
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  questionId: number;
}
