import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.productName = createProductDto.productName;
    product.productDetail = createProductDto.productDetail;
    product.productPrice = createProductDto.productPrice;
    product.isInStock = createProductDto.isInStock;
    product.category = createProductDto.category;

    if (createProductDto.file) {
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: createProductDto.file.buffer,
        Key: `image/main/${Date.now().toString()}-${
          createProductDto.file.originalname
        }`,
        ACL: 'public-read',
      };

      try {
        const data = await s3.upload(uploadParams).promise();
        product.imgUrl = data.Location;
      } catch (err) {
        console.log('Error', err);
      }
    }

    return await this.productsRepository.save(product);
  }

  /*
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    const productInfo = createProductDto.productInfo;
    product.productName = productInfo.productName;
    product.productDetail = productInfo.productDetail;
    product.productPrice = productInfo.productPrice;
    product.isInStock = productInfo.isInStock;
    product.category = productInfo.category;

    const file = productInfo.file;
    if (file) {
      const uploadDir = './uploads';
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir);
      }
      const newFilePath = join(uploadDir, file.originalname);
      renameSync(file.path, newFilePath);
      console.log(newFilePath);
      product.imgUrl = newFilePath;
    }
    return await this.productsRepository.save(product);
  }
  */

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({
      select: [
        'productId',
        'productName',
        'productPrice',
        'isInStock',
        'like',
        'imgUrl',
        'category',
      ],
    });
  }

  async findOne(productId: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { productId: productId },
    });

    if (!product) {
      throw new NotFoundException(
        `해당 id(${productId}) 를 가진 상품이 존재하지 않습니다.`,
      );
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async remove(productId: number): Promise<void> {
    await this.findOne(productId);
    await this.productsRepository.delete(productId);
  }

  // 검색
  async search(keyword: string): Promise<Product[]> {
    const products = await this.productsRepository.find({
      where: {
        productName: Like(`%${keyword}%`),
      },
    });

    if (products.length === 0) {
      throw new NotFoundException(
        `'${keyword}'에 해당하는 상품을 찾을 수 없습니다.`,
      );
    }
    return products;
  }

  /**좋아요 */
  // 일단 이렇게만 해둠;; 유저 로그인이 필요가 없긴 한데.. 대화가 필요할 듯
  async addLike(productId: number): Promise<Product> {
    const product = await this.findOne(productId);
    product.like++;
    const updatedProduct = await this.productsRepository.save(product);
    return updatedProduct;
  }
  async removeLike(productId: number): Promise<Product> {
    const product = await this.findOne(productId);
    product.like--;
    const updatedProduct = await this.productsRepository.save(product);
    return updatedProduct;
  }
}
