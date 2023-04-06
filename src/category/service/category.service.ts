import { Injectable } from '@nestjs/common';
import { Category } from '../entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from '../dto/category-create.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getTheLastCategory(): Promise<Category[]> {
    const query = await this.categoryRepository
      .createQueryBuilder('category')
      .orderBy('category.id', 'DESC')
      .limit(3)
      .getManyAndCount();

    return query[0];
  }

  async createCategory(data: CategoryCreateDto): Promise<Category> {
    const category = this.categoryRepository.create(data);

    return this.categoryRepository.save(category);
  }

  async getOneCategoryById(id: number): Promise<Category> {
    const query = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'product')
      .where('category.id = :id', { id })
      .getOne();

    return query;
  }
}
