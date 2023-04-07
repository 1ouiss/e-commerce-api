import { Injectable } from '@nestjs/common';
import { OrderItem } from '../entity/orderItem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { OrderItemCreateDto } from '../dto/orderItem-create.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async getAllOrderItems(): Promise<OrderItem[]> {
    return await this.orderItemRepository.find();
  }

  async createOrderItem(data: OrderItemCreateDto): Promise<OrderItem> {
    try {
      return this.orderItemRepository.save(data);
    } catch (error) {
      throw new Error('Error while creating orderItem');
    }
  }

  async getOneOrderItemById(id: number): Promise<OrderItem> {
    return await this.orderItemRepository.findOneBy({ id });
  }

  async getOrderItemsByOrderId(id: number): Promise<OrderItem[]> {
    const query = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .leftJoinAndSelect('orderItem.order', 'order')
      .leftJoinAndSelect('orderItem.product', 'product')
      .where('order.id = :id', { id })
      .getMany();

    return query;
  }

  async deleteOrderItem(id: number): Promise<DeleteResult> {
    return await this.orderItemRepository.delete(id);
  }
}
