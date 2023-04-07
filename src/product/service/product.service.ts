import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { Injectable } from '@nestjs/common';
import { OrderItemService } from 'src/orderItem/service/orderItem.service';

Injectable();
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly orderItemService: OrderItemService,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const query = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .orderBy('product.id', 'DESC')
      .getMany();
    return query;
  }

  async getTheLastProduct(): Promise<Product[]> {
    const query = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .orderBy('product.id', 'DESC')
      .limit(3)
      .getManyAndCount();

    return query[0];
  }

  async createProduct(data: ProductCreateDto): Promise<Product> {
    try {
      return this.productRepository.save(data);
    } catch (error) {
      throw new Error('Error while creating product');
    }
  }

  async getOneProductById(id: number): Promise<Product> {
    const query = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id = :id', { id })
      .getOne();

    return query;
  }

  async updateProduct(id: number, data: ProductUpdateDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    const productUpdate = { ...product, ...data };

    await this.productRepository.save(productUpdate);

    return productUpdate;
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.orderItems', 'orderItem')
      .where('product.id = :id', { id })
      .getOne();

    if (product.orderItems.length > 0) {
      product.orderItems.map(async (orderItem) => {
        await this.orderItemService.deleteOrderItem(orderItem.id);
      });
    }

    return await this.productRepository.delete(id);
  }
}
