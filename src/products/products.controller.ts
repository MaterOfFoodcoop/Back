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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@Controller('products')
@ApiTags('상품 API')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: '상품 등록 API',
    description:
      '상품을 생성한다. formData로 img 파일도 넣어 줘야 함, category는 Chip, Beverage, IceCream, ProcessedFood, Etc 중 보내야 한다.',
  })
  @ApiCreatedResponse({ description: '상품이 성공적으로 생성됨.' })
  @ApiBody({ type: CreateProductDto })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: '상품 수정 API', description: '상품을 수정한다.' })
  @ApiOkResponse({ description: '상품이 성공적으로 수정됨.' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UpdateProductDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiOperation({
    summary: '상품 조회 API',
    description: '전체 상품을 조회한다.',
  })
  @ApiOkResponse({ description: '상품 조회 성공', type: [Product] })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({
    summary: '이미지 조회 API',
    description: 'imgPath를 통해 이미지를 보낸다.',
  })
  @ApiParam({ name: 'imgPath', description: '이미지 경로' })
  @ApiOkResponse({ description: '이미지 조회 성공' })
  @Get('images/:imgPath')
  seeUploadedFile(@Param('imgPath') image, @Res() res: Response) {
    return res.sendFile(image, { root: './uploads' });
  }

  @ApiOperation({ summary: '상품 검색', description: '상품을 검색한다.' })
  @ApiOkResponse({ description: '상품 검색 성공', type: [Product] })
  @Get('search')
  async search(@Query('keyword') keyword: string) {
    return this.productsService.search(keyword);
  }

  @ApiOperation({
    summary: '상품 조회 API',
    description: '상품의 세부 정보를 조회한다.',
  })
  @ApiParam({ name: 'id', description: '상품 ID' })
  @ApiOkResponse({ description: '상품 조회 성공', type: Product })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }

  @ApiOperation({ summary: '상품 삭제 API', description: '상품을 삭제한다.' })
  @ApiParam({ name: 'id', description: '상품 ID' })
  @ApiOkResponse({ description: '상품 삭제 성공' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }

  @ApiOperation({ description: '좋아요를 1씩 올린다.' })
  @ApiParam({ name: 'id', description: '상품 ID' })
  @ApiOkResponse({ description: '좋아요 추가 성공' })
  /**좋아요 */
  @Post(':id/like')
  async addLike(@Param('id') id: number) {
    return this.productsService.addLike(id);
  }

  @ApiOperation({ description: '좋아요를 1씩 내린다.' })
  @ApiParam({ name: 'id', description: '상품 ID' })
  @ApiOkResponse({ description: '좋아요 삭제 성공' })
  @Delete(':id/like')
  async removeLike(@Param('id') id: number) {
    return this.productsService.removeLike(id);
  }
}
