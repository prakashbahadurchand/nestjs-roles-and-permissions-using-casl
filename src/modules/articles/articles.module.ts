import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';
import { CaslModule } from '../casl/casl.module';

@Module({
    imports: [TypeOrmModule.forFeature([Article]), CaslModule],
    controllers: [ArticlesController],
    providers: [ArticlesService],
})
export class ArticlesModule { }
