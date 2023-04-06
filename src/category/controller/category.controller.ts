import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { Category } from '../entity/category.entity';
import { CategoryCreateDto } from '../dto/category-create.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get('last')
  getTheLastCategory() {
    return this.categoryService.getTheLastCategory();
  }

  @Get(':id')
  getOneCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.getOneCategoryById(id);
  }

  @Post()
  createCategory(@Body() data: CategoryCreateDto) {
    return this.categoryService.createCategory(data);
  }
}
