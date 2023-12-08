import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ProductCategory } from '../entities/product.entity';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  productName: string;

  @IsOptional()
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsOptional()
  @IsString()
  productDetail: string;

  @IsOptional()
  @IsNumber()
  productPrice: number;

  @IsOptional()
  @IsBoolean()
  isInStock: boolean;
}
