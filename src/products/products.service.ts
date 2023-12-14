import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

import * as path from 'path';
import * as AWS from 'aws-sdk';

@Injectable()
export class ProductsService {
  private readonly awsS3: AWS.S3;
  public readonly S3_BUCKET_NAME: string;

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {
    this.awsS3 = new AWS.S3({
      accessKeyId: 'AKIAZ6ZZDMHLMXYIEZM5',
      secretAccessKey: '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',
      region: 'ap-northeast-2',
      // accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
      // secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
      // region: process.env.S3_REGION,
    });
    this.S3_BUCKET_NAME = 'coop-img-bucket';
    // this.S3_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
  }

  async deleteFileFromS3(fileUrl: string): Promise<void> {
    try {
      const decodedUrl = decodeURI(fileUrl);
      const urlParts = decodedUrl.split('/');
      const key = urlParts.slice(3).join('/');

      await this.awsS3
        .deleteObject({
          Bucket: this.S3_BUCKET_NAME,
          Key: key,
        })
        .promise();
    } catch (error) {
      throw new BadRequestException(`File to delete failed : ${error}`);
    }
  }

  async uploadFileToS3(
    folder: string,
    file: Express.Multer.File,
  ): Promise<{
    // key: string;
    // s3Object: PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>;
    // contentType: string;
    url: string;
  }> {
    try {
      const key = `${folder}/${Date.now()}_${path.basename(
        file.originalname,
      )}`.replace(/ /g, '');
      // 공백을 제거해주는 정규식
      const s3Object = await this.awsS3
        .putObject({
          Bucket: this.S3_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          // ACL: 'public-read',
          ContentType: file.mimetype,
        })
        .promise();
      const imgUrl = `https://${this.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
      // return { key, s3Object, contentType: file.mimetype, url: imgUrl };
      return { url: imgUrl };
    } catch (error) {
      throw new BadRequestException(`File upload failed : ${error}`);
    }
  }

  async create(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<Product> {
    const product = new Product();
    product.productName = createProductDto.productName;
    product.productDetail = createProductDto.productDetail;
    product.productPrice = createProductDto.productPrice;
    //아니 form데이타 인식도 못하냐;;
    product.isInStock = createProductDto.isInStock === 'true';
    // product.isInStock = createProductDto.isInStock;
    product.category = createProductDto.category;
    if (file) {
      const fileUrl = await this.uploadFileToS3('imgs', file);
      product.imgUrl = fileUrl.url;
    }
    return this.productsRepository.save(product);
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
    const product = await this.findOne(productId);

    if (product.imgUrl) {
      await this.deleteFileFromS3(product.imgUrl);
    }

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
