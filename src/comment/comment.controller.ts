import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAllByProductId(@Param('productId') productId: number) {
    return await this.commentService.findAllByProductId(productId);
  }

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.createComment(createCommentDto);
  }

  @Delete()
  async deleteComment(@Param('productId') productId: number) {
    return await this.commentService.deleteComment(productId);
  }
}
