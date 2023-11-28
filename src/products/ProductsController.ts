import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { join } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    this.productsService.create(createProductDto);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const name = join(file.originalname);
          callback(null, `${name}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFiles() files) {
    console.log(files);
    return files;
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }
  @Get()
  findAll() {
    return this.productsService.findAll();
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
