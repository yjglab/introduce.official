import { AppModule } from '@modules/app/app.module';
import { NestFactory } from '@nestjs/core';

import { SERVER_PORT } from '@shared/constants/global.constants';
import { setupSwagger } from '@utils/swagger/setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  setupSwagger(app);
  await app.listen(SERVER_PORT);
}
bootstrap();
