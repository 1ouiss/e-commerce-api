import { IsDate, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/category/entity/category.entity';

export class ProductUpdateDto {
  @IsNumber()
  id: number;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsNumber()
  category: Category;

  createdAt: any;
}
