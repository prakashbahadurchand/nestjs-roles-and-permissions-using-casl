import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '../users/entities/user.entity'; // Adjust path as necessary
import { Article } from './entities/article.entity';
import { ApiResponseDto } from '../../core/common/dto/api-response.dto';

@ApiTags('Articles')
@ApiBearerAuth() // Indicates that JWT is required for all routes in this controller
@UseGuards(AuthGuard('jwt'))
@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new article' })
    @ApiResponse({ status: 201, description: 'Article successfully created.', type: ApiResponseDto<Article> })
    @ApiResponse({ status: 401, description: 'Unauthorized.', type: ApiResponseDto<null> })
    @ApiResponse({ status: 403, description: 'Forbidden.', type: ApiResponseDto<null> })
    create(@Body() createArticleDto: CreateArticleDto, @Req() req: Request) {
        return this.articlesService.create(createArticleDto, req.user as User);
    }

    @Get()
    @ApiOperation({ summary: 'Get all articles' })
    @ApiResponse({ status: 200, description: 'List of articles.', type: ApiResponseDto<Article[]> })
    @ApiResponse({ status: 401, description: 'Unauthorized.', type: ApiResponseDto<null> })
    findAll(@Req() req: Request) {
        return this.articlesService.findAll(req.user as User);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an article by ID' })
    @ApiResponse({ status: 200, description: 'Article details.', type: ApiResponseDto<Article> })
    @ApiResponse({ status: 401, description: 'Unauthorized.', type: ApiResponseDto<null> })
    @ApiResponse({ status: 403, description: 'Forbidden.', type: ApiResponseDto<null> })
    @ApiResponse({ status: 404, description: 'Not Found.', type: ApiResponseDto<null> })
    findOne(@Param('id') id: string, @Req() req: Request) {
        return this.articlesService.findOne(+id, req.user as User);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an article by ID' })
    @ApiResponse({ status: 200, description: 'Article successfully updated.', type: ApiResponseDto<Article> })
    @ApiResponse({ status: 401, description: 'Unauthorized.', type: ApiResponseDto<null> })
    @ApiResponse({ status: 403, description: 'Forbidden.', type: ApiResponseDto<null> })
    @ApiResponse({ status: 404, description: 'Not Found.', type: ApiResponseDto<null> })
    update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto, @Req() req: Request) {
        return this.articlesService.update(+id, updateArticleDto, req.user as User);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an article by ID' })
    @ApiResponse({ status: 204, description: 'Article successfully deleted.', type: ApiResponseDto<null> })
    @ApiResponse({ status: 401, description: 'Unauthorized.', type: ApiResponseDto<null> })
    @ApiResponse({ status: 403, description: 'Forbidden.', type: ApiResponseDto<null> })
    @ApiResponse({ status: 404, description: 'Not Found.', type: ApiResponseDto<null> })
    remove(@Param('id') id: string, @Req() req: Request) {
        return this.articlesService.remove(+id, req.user as User);
    }

    @Patch(':id/publish')
    @ApiOperation({ summary: 'Publish an article by ID' })
    @ApiResponse({ status: 200, description: 'Article successfully published.', type: ApiResponseDto<Article> })
    @ApiResponse({ status: 401, description: 'Unauthorized.', type: ApiResponseDto<null> })
    @ApiResponse({ status: 403, description: 'Forbidden.', type: ApiResponseDto<null> })
    @ApiResponse({ status: 404, description: 'Not Found.', type: ApiResponseDto<null> })
    publish(@Param('id') id: string, @Req() req: Request) {
        return this.articlesService.publish(+id, req.user as User);
    }
}
