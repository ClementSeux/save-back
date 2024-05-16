import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
import * as fs from 'fs';

config();

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(
      '/etc/letsencrypt/live/save.back.clementseux.me/privkey.pem',
    ),
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/save.back.clementseux.me/fullchain.pem',
    ),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const doc = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('SAVE API')
      .setDescription('API for SAVE project')
      .setVersion('1.0')
      .build(),
  );
  SwaggerModule.setup('docs', app, doc);

  await app.init();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
