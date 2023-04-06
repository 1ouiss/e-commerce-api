import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.useGlobalPipes(
    new ValidationPipe({
      // retire tout les champs qui ne sont pas déclaré dans la dto
      whitelist: true,
      // rejette les requêtes qui contiennent des champs non déclaré dans la dto
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
