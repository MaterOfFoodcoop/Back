import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNumber()
  productPrice: number;

  @IsOptional()
  @IsBoolean()
  isInStock: boolean;
}
