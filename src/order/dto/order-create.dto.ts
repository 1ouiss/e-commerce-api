import { IsArray, IsNumber, IsString } from 'class-validator';
import { OrderItemCreateDto } from 'src/orderItem/dto/orderItem-create.dto';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';

export class OrderCreateDto {
  @IsString()
  status: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  user: User;

  @IsArray()
  orderItems: OrderItemCreateDto[];
}
