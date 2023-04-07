import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { Product } from '../entity/product.entity';
import { DeleteResult } from 'typeorm';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get('last')
  getTheLastProduct(): Promise<Product[]> {
    return this.productService.getTheLastProduct();
  }

  @Get(':id')
  getOneProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.getOneProductById(id);
  }

  @Post()
  createProduct(@Body() data: ProductCreateDto): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ProductUpdateDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
