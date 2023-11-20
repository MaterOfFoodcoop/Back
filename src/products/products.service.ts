import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<unknown> {
    const product = this.productsRepository.create(createProductDto);
    console.log(product);
    return await this.productsRepository.save(product);
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // async update(
  //   id: number,
  //   updateProductDto: UpdateProductDto,
  // ): Promise<Product> {
  //   const product = await this.productsRepository.findOne(id);
  //   if (!product) {
  //     throw new Error(`Product with ID ${id} not found`);
  //   }
  //   Object.assign(product, updateProductDto);
  //   return await this.productsRepository.save(product);
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
