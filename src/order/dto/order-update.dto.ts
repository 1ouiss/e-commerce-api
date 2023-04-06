import { IsNumber } from 'class-validator';
import { User } from 'src/user/entity/user.entity';

export class OrderUpdateDto {
  status: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  user: User;
}
