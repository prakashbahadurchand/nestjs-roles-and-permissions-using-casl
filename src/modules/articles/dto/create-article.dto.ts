import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateArticleDto {
    @ApiProperty({ example: 'My First Article', description: 'The title of the article' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    title: string;

    @ApiProperty({ example: 'This is the content of my first article.', description: 'The content of the article' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ example: false, description: 'Whether the article is published', required: false })
    @IsOptional()
    @IsBoolean()
    isPublished?: boolean;
}
