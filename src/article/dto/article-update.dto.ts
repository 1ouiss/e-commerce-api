import { IsString } from 'class-validator';

export class ArticleUpdateDto {
  @IsString()
  title: string;
}
