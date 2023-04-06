import { IsNumber } from 'class-validator';
import { Order } from 'src/order/entity/order.entity';
import { Product } from 'src/product/entity/product.entity';

export class OrderItemCreateDto {
  @IsNumber()
  quantity: number;
  @IsNumber()
  order: Order;
  @IsNumber()
  product: Product;
}
