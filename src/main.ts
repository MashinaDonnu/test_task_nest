import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  console.log('process env port: ', process.env.PORT);
  //@ts-ignore
  const port = +config.get<number>('PORT') || 3000;
  console.log('port');

  await app.listen(port);
  console.log(`App started on port ${port}`);
}
bootstrap().catch((e) => console.log('Bootstrap error: ', e));
