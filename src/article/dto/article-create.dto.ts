import { MinLength } from 'class-validator';

export class ArticleCreateDto {
  @MinLength(3)
  title: string;
}
