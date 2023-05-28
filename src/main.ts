import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  //@ts-ignore
  const port = +config.get<number>('API_PORT') || 3000;
  await app.listen(port);
  console.log(`App started on port ${port}`);
}
bootstrap().catch((e) => console.log('Bootstrap error: ', e));
