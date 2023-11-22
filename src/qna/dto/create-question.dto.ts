import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

class QuestionInfo {
  @IsOptional()
  @IsString()
  productName: string;

  @IsOptional()
  @IsString()
  productDetail: string;
}

export class CreateQuestionDto {
  @IsNotEmpty()
  productInfo: QuestionInfo;
}
