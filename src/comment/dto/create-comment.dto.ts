import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: '히히 집가고싶다' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 12 })
  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
