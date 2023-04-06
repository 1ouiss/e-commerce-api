import { Category } from 'src/category/entity/category.entity';
import { OrderItem } from 'src/orderItem/entity/orderItem.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  // timestamp typeorm
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @ManyToOne(() => Category, (category) => category.products, {
    cascade: true,
    eager: true,
  })
  category: Category;
}
