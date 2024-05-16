import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as https from 'https';

// let options = {
//   key: fs.readFileSync(Config.SSL_KEY_PATH),
//   cert: fs.readFileSync(Config.SSL_CERT_PATH)
// };

// let httpsServer = https.createServer(options, expressApp);

// const app = NestFactory.create(ApplicationModule, expressApp);
// app.useGlobalPipes(new ValidatorPipe());
// app.init();

// httpsServer.listen(httpsPort);

config();

async function bootstrap() {
  const expressApp = require('express')();
  const httpsOptions = {
    key: fs.readFileSync(
      '/etc/letsencrypt/live/save.back.clementseux.me/privkey.pem',
    ),
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/save.back.clementseux.me/fullchain.pem',
    ),
  };

  let httpsServer = https.createServer(httpsOptions, expressApp);

  const app = await NestFactory.create(AppModule, expressApp);

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
  });

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

  app.init();

  httpsServer.listen(process.env.PORT || 3000);
}
bootstrap();
