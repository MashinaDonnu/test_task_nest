import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const PORT = process.env.PORT;
  console.log('process.env.PORT: ', PORT);
  const config = await app.get(ConfigService);

  //@ts-ignore
  const port = +config.get<number>('PORT') || 3000;

  console.log('bootstrap port ', port);
  const app = await NestFactory.create(AppModule);

  await app.listen(port);
  console.log(`App started on port ${port}`);
}
bootstrap().catch((e) => console.log('Bootstrap error: ', e));
