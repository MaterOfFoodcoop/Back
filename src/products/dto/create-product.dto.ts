import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ProductCategory } from '../entities/product.entity';

class ProductInfo {
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

  @IsOptional()
  file: Express.Multer.File;
}

export class CreateProductDto {
  @IsNotEmpty()
  productInfo: ProductInfo;
}
