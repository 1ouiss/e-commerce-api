import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const query = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders')
      .getMany();

    return query;
  }

  async getOneUserByEmail(email: string): Promise<User> {
    const query = await this.userRepository

      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders')
      .where('user.email = :email', { email })
      .getOne();

    return query;
  }

  async createUser(data: UserCreateDto): Promise<User> {
    try {
      const hash = await bcrypt.hash(data.password, 10);
      data.password = hash;

      return this.userRepository.save(data);
    } catch (error) {
      throw new Error('Error while creating user');
    }
  }

  async getOneUserById(id: number): Promise<User> {
    const query = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders')
      .leftJoinAndSelect('orders.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product')
      .where('user.id = :id', { id })
      .getOne();
    return query;
  }

  async updateUser(id: number, data: UserUpdateDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    const userUpdate = { ...user, ...data };

    await this.userRepository.save(userUpdate);

    return userUpdate;
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
