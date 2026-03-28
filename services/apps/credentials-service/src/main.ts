import { NestFactory } from '@nestjs/core';
import { CredentialsServiceModule } from './credentials-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CredentialsServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
