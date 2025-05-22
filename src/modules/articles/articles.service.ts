import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from '../users/entities/user.entity';
import { CaslAbilityFactory, AppAbility } from '../casl/casl-ability.factory';
import { Action } from '../casl/casl-ability.factory'; // Assuming Action enum is in casl-ability.factory

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private articlesRepository: Repository<Article>,
        private caslAbilityFactory: CaslAbilityFactory,
    ) { }

    async create(createArticleDto: CreateArticleDto, user: User): Promise<Article> {
        const ability = this.caslAbilityFactory.createForUser(user);
        if (ability.cannot(Action.Create, Article)) {
            throw new ForbiddenException('You are not authorized to create articles.');
        }
        const article = this.articlesRepository.create({
            ...createArticleDto,
            author: user,
            authorId: user.id,
        });
        return this.articlesRepository.save(article);
    }

    async findAll(user: User): Promise<Article[]> {
        const ability = this.caslAbilityFactory.createForUser(user);
        // Example: Filter articles based on read permission if necessary
        // This might involve more complex logic depending on how granular you want permissions
        // For now, returning all if user can read any article
        if (ability.cannot(Action.Read, Article)) {
            throw new ForbiddenException('You are not authorized to read articles.');
        }
        return this.articlesRepository.find();
    }

    async findOne(id: number, user: User): Promise<Article> {
        const article = await this.articlesRepository.findOne({ where: { id }, relations: ['author'] });
        if (!article) {
            throw new ForbiddenException('Article not found.');
        }
        const ability = this.caslAbilityFactory.createForUser(user);
        if (ability.cannot(Action.Read, article)) {
            throw new ForbiddenException('You are not authorized to read this article.');
        }
        return article;
    }

    async update(id: number, updateArticleDto: UpdateArticleDto, user: User): Promise<Article> {
        const article = await this.articlesRepository.findOne({ where: { id } });
        if (!article) {
            throw new ForbiddenException('Article not found.');
        }
        const ability = this.caslAbilityFactory.createForUser(user);
        if (ability.cannot(Action.Update, article)) {
            throw new ForbiddenException('You are not authorized to update this article.');
        }
        Object.assign(article, updateArticleDto);
        return this.articlesRepository.save(article);
    }

    async remove(id: number, user: User): Promise<void> {
        const article = await this.articlesRepository.findOne({ where: { id } });
        if (!article) {
            throw new ForbiddenException('Article not found.');
        }
        const ability = this.caslAbilityFactory.createForUser(user);
        if (ability.cannot(Action.Delete, article)) {
            throw new ForbiddenException('You are not authorized to delete this article.');
        }
        await this.articlesRepository.delete(id);
    }

    async publish(id: number, user: User): Promise<Article> {
        const article = await this.articlesRepository.findOne({ where: { id } });
        if (!article) {
            throw new ForbiddenException('Article not found.');
        }
        const ability = this.caslAbilityFactory.createForUser(user);
        // Assuming a specific 'Publish' action or using 'Update' with field conditions
        if (ability.cannot(Action.Update, article, 'isPublished')) {
            throw new ForbiddenException('You are not authorized to publish/unpublish this article.');
        }
        article.isPublished = true;
        return this.articlesRepository.save(article);
    }
}
