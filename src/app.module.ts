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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'toor',
      database: 'nestjs_casl_demo',
      entities: [User, Article],
      synchronize: true,
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
