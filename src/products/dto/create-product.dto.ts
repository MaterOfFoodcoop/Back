import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  productDetail: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  isInStock: boolean;

  @IsOptional()
  @IsString()
  imgUrl: string;
}
