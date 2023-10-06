import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { setupSwagger } from './utils/swagger/setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(SERVER_PORT);
}
bootstrap();
