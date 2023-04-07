import { Injectable } from '@nestjs/common';
import { Category } from '../entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryCreateDto } from '../dto/category-create.dto';
import { ProductService } from 'src/product/service/product.service';
import { OrderItemService } from 'src/orderItem/service/orderItem.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly productService: ProductService,
    private readonly orderItemService: OrderItemService,
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

  async deleteCategory(id: number) {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'product')
      .leftJoinAndSelect('product.orderItems', 'orderItem')
      .where('category.id = :id', { id })
      .getOne();

    category.products.map(async (product) => {
      product.orderItems.map(async (orderItem) => {
        await this.orderItemService.deleteOrderItem(orderItem.id);
      });
      await this.productService.deleteProduct(product.id);
    });

    return await this.categoryRepository.delete(id);
  }
}
