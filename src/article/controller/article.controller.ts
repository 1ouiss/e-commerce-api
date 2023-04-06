import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { ArticleCreateDto } from '../dto/article-create.dto';
import { ArticleUpdateDto } from '../dto/article-update.dto';
import { Article } from '../entity/article.entity';
import { DeleteResult } from 'typeorm';

// @Controller('articles')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('articles')
export class ArticleController {
  // injection de dépendance
  // permet d'instancier la classe ArticleService
  // dans la propriété articleService
  constructor(private readonly articleService: ArticleService) {}

  // @Get() est un décorateur qui permet de déclarer
  // une route accessible avec la méthode GET
  @Get()
  getAllArticles(): Promise<Article[]> {
    return this.articleService.getAllarticles();
  }

  // on peut passer en parametre du décorateur
  // un segment d'url avec éventuellement des paramètres
  // on peut ensuite récupérer sa valeur avec le décorateur @Param
  @Get(':id')
  getOneArticleById(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articleService.getOneArticleById(id);
  }

  @Post()
  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  createArticle(@Body() data: ArticleCreateDto): Promise<Article> {
    return this.articleService.createArticle(data);
  }

  @Put(':id')
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ArticleUpdateDto,
  ): Promise<Article> {
    return this.articleService.updateArticle(id, data);
  }

  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.articleService.deleteArticle(id);
  }
}
