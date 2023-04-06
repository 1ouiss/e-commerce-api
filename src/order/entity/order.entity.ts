import { OrderItem } from 'src/orderItem/entity/orderItem.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'int' })
  amount: number;

  @ManyToOne(() => User, (user) => user.orders, { eager: true, cascade: true })
  @JoinTable()
  user: User;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.order, {
    eager: true,
    cascade: true,
  })
  orderItems: OrderItem[];
}
