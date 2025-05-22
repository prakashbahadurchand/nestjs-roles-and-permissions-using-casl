import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Persist authorization data on browser refresh
      docExpansion: 'list', // Expand list by default
      filter: true, // Enable filtering
      tryItOutEnabled: true, // Enable "Try it out" by default
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
