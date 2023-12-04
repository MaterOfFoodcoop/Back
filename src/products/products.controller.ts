import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
  Res,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    this.productsService.create(createProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('images/:imgPath')
  seeUploadedFile(@Param('imgPath') image, @Res() res: Response) {
    return res.sendFile(image, { root: './uploads' });
  }

  @Get('search')
  async search(@Query('keyword') keyword: string) {
    return this.productsService.search(keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }

  /**좋아요 */
  @Post(':id/like')
  async addLike(@Param('id') id: number) {
    return this.productsService.addLike(id);
  }

  @Delete(':id/like')
  async removeLike(@Param('id') id: number) {
    return this.productsService.removeLike(id);
  }
}
