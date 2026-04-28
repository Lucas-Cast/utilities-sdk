import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { environment } from 'libs/config/environment'
import { AppModule } from './app.module'
import { setupSwagger } from './swagger.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('Gateway')

  setupSwagger(app)

  await app.listen(environment.PORT)

  const url = await app.getUrl()
  logger.log(`Application running on ${url}`)
  logger.log(`Swagger docs: ${url}/docs`)
}
void bootstrap()
