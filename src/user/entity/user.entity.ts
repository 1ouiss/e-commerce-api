import { SerializeOptions } from '@nestjs/common';
import { Order } from 'src/order/entity/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  address: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
