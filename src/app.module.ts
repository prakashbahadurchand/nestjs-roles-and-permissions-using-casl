import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { Article } from './modules/articles/entities/article.entity';
import { CaslModule } from './modules/casl/casl.module';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Replace with your DB host
      port: 3306, // Replace with your DB port
      username: 'root', // Replace with your DB username
      password: 'toor', // Replace with your DB password
      database: 'nestjs_casl_demo', // Replace with your DB name
      entities: [User, Article], // Add other entities here
      synchronize: true, // true for development, false for production
    }),
    AuthModule,
    UsersModule,
    CaslModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
