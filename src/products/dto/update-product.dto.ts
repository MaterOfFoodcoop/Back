import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 1000 })
  @IsOptional()
  @IsNumber()
  productPrice: number;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isInStock: boolean;
}
