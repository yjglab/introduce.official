import { AppModule } from '@modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SERVER_PORT } from '@shared/constants/global.constants';
import { setupSwagger } from '@utils/swagger/setupSwagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  setupSwagger(app);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Validation 검사 실패한 속성 자동 제거
      forbidNonWhitelisted: true, // 허용되지 않은 속성이 발견되면 요청을 처리하지 않고 오류 반환
      transform: true, // 데이터 타입 변환(문자열 숫자 -> 숫자)
    }),
  );
  await app.listen(SERVER_PORT);
}
bootstrap();
