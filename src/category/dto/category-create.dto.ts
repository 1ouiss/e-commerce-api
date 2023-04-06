import { IsString } from 'class-validator';

export class CategoryCreateDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
