import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { ArticleUpdateDto } from '../dto/article-update.dto';
import { ArticleCreateDto } from '../dto/article-create.dto';

Injectable();
export class ArticleService {
  constructor(
    // on "injecte" le repository de l'entité Article
    // dans la propriété articleRepository de la classe ArticleService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getAllarticles(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async createArticle(data: ArticleCreateDto): Promise<Article> {
    try {
      return this.articleRepository.save(data);
    } catch (error) {
      throw new Error('Error while creating article');
    }
  }
  async getOneArticleById(id: number): Promise<Article> {
    return await this.articleRepository.findOneBy({ id });
  }

  async updateArticle(id: number, data: ArticleUpdateDto): Promise<Article> {
    // on récupère l'article ciblé
    const article = await this.articleRepository.findOneBy({ id });
    // on "merge" les données du body de la requête
    // avec les données déjà présentes dans l'article
    const articleUpdate = { ...article, ...data };
    // on sauvegarde l'article mis à jour
    await this.articleRepository.save(articleUpdate);

    return articleUpdate;
  }
  async deleteArticle(id: number) {
    return await this.articleRepository.delete(id);
  }
}
