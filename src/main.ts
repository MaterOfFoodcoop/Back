import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { setupSwagger } from './util/setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.enableCors();
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
