import { IsArray, IsNumber, IsString } from 'class-validator';
import { OrderItem } from 'src/orderItem/entity/orderItem.entity';
import { User } from 'src/user/entity/user.entity';

export class OrderUpdateDto {
  @IsNumber()
  id: number;

  @IsString()
  status: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  user: User;

  @IsArray()
  orderItems: OrderItem[];
}
