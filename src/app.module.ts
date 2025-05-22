import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { Article } from './modules/articles/entities/article.entity';
import { CaslModule } from './modules/casl/casl.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTransformInterceptor } from './core/common/interceptors/response-transform.interceptor';

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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
  ],
})
export class AppModule { }
