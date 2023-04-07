import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { DeleteResult, Repository } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderUpdateDto } from '../dto/order-update.dto';
import { OrderItemService } from 'src/orderItem/service/orderItem.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderItemService: OrderItemService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoinAndSelect('orderItem.product', 'product');
    return await query.getMany();
  }

  async createOrder(data: OrderCreateDto): Promise<Order> {
    try {
      const order = this.orderRepository.create(data);
      console.log(order);

      const newOrder = await this.orderRepository.save(order);
      console.log(newOrder);

      const orderFind = await this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.user', 'user')
        .leftJoinAndSelect('order.orderItems', 'orderItem')
        .leftJoinAndSelect('orderItem.product', 'product')
        .where('order.id = :id', { id: newOrder.id })
        .getOne();

      return orderFind;
    } catch (error) {
      throw new Error('Error while creating order');
    }
  }

  async getOneOrderById(id: number): Promise<Order> {
    const query = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .where('order.id = :id', { id })
      .getOne();

    if (!query) {
      return null;
    }

    return query;
  }

  async getOrderByUserPending(userId: number): Promise<Order> {
    const query = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .where('order.user = :userId', { userId })
      .andWhere('order.status = :status', { status: 'pending' })
      .getOne();

    return query;
  }

  async updateOrder(id: number, data: OrderUpdateDto): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id });

    const orderUpdate = { ...order, ...data };

    await this.orderRepository.save(orderUpdate);

    return orderUpdate;
  }

  async deleteOrder(id: number): Promise<DeleteResult> {
    return await this.orderRepository.delete(id);
  }
}
