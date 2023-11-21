import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

class ProductInfo {
  @IsOptional()
  @IsString()
  productName: string;

  @IsOptional()
  @IsString()
  productDetail: string;

  @IsOptional()
  @IsNumber()
  productPrice: number;

  @IsOptional()
  @IsBoolean()
  isInStock: boolean;

  @IsOptional()
  @IsString()
  imgUrl: string;
}

export class CreateProductDto {
  @IsNotEmpty()
  productInfo: ProductInfo;
}
