import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const PORT = process.env.PORT;
  console.log('process.env.PORT: ', PORT);

  const app = await NestFactory.create(AppModule);

  // await app.listen(PORT);
  await app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    console.log(`App started on port callback ${PORT}`, app);
  });
  console.log(`App started on port ${PORT}`);
}
bootstrap().catch((e) => console.log('Bootstrap error: ', e));
