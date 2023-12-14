import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

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

  @ApiOperation({
    summary: '댓글 API',
    description: 'QNA에 질문을 작성한다.',
  })
  @ApiBody({ type: CreateCommentDto })
  async createComment(createCommentDto: CreateCommentDto) {
    const { content, productId } = createCommentDto;
    const product = await this.findOne(productId);
    if (!product) {
      throw new NotFoundException(
        `해당 id(${productId}) 를 가진 상품이 존재하지 않습니다.`,
      );
    }
    const newComment = this.commentsRepository.create({
      content,
      product,
    });
    await this.commentsRepository.save(newComment);
    return newComment;
  }

  async deleteComment(productId: number) {
    const product = await this.findOne(productId);
    console.log(product);
  }

  async findAllByProductId(productId: number) {
    await this.findOne(productId);
    return await this.commentsRepository.find({
      where: { product: { productId: productId } },
    });
  }
}
