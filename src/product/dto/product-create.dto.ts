import { IsNumber, IsObject, MinLength } from 'class-validator';
import { Category } from 'src/category/entity/category.entity';

export class ProductCreateDto {
  @MinLength(3, {
    message: 'Title is too short',
  })
  title: string;

  @MinLength(3, {
    message: 'Description is too short',
  })
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  category: Category;
}
