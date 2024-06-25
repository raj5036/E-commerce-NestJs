import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.resolve('src/ssl/server.key')),
    cert: fs.readFileSync(path.resolve('src/ssl/server.cert')),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(process.env.PORT);

  console.log(`Application is running on: ${process.env.HOST}:${process.env.PORT}`);
}
bootstrap();
