import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    const productInfo = createProductDto.productInfo;
    product.productName = productInfo.productName;
    product.productDetail = productInfo.productDetail;
    product.productPrice = productInfo.productPrice;
    product.isInStock = productInfo.isInStock;
    product.imgUrl = productInfo.imgUrl;
    return await this.productsRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({
      select: [
        'productId',
        'productName',
        'productPrice',
        'isInStock',
        'like',
        'imgUrl',
      ],
    });
  }

  async findOne(productId: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { productId: productId },
    });

    if (!product) {
      throw new NotFoundException(
        `해당 #${productId}를 가진 상품이 존재하지 않습니다.`,
      );
    }

    return product;
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
