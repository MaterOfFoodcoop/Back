import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ProductCategory } from '../entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  productName: string;

  @ApiProperty({ example: 'Beverage' })
  @IsOptional()
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @ApiProperty({ example: '맛있습니다.' })
  @IsOptional()
  @IsString()
  productDetail: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  productPrice: number;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isInStock: boolean;
}
