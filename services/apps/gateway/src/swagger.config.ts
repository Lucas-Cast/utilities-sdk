import { CredentialsServiceModule } from '@app/credentials/credentials-service.module'
import { INestApplication, Type } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

interface SwaggerDocConfig {
  title: string
  description: string
  version: string
  path: string
  include: Type[]
}

const services: SwaggerDocConfig[] = [
  {
    title: 'Credentials Service',
    description: 'Client credentials and feature management',
    version: '1.0',
    path: 'credentials',
    include: [CredentialsServiceModule],
  },
  // {
  //   title: 'Scheduler Service',
  //   description: 'Task scheduling management',
  //   version: '1.0',
  //   path: 'scheduler',
  //   include: [SchedulerModule],
  // },
]

export function setupSwagger(app: INestApplication) {
  const urls = services.map((service) => ({
    url: `/docs/${service.path}-json`,
    name: service.title,
  }))

  const documents = services.map((service) => {
    const config = new DocumentBuilder()
      .setTitle(service.title)
      .setDescription(service.description)
      .setVersion(service.version)
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, config, {
      include: service.include,
      deepScanRoutes: true,
    })

    SwaggerModule.setup(`docs/${service.path}`, app, document, {
      jsonDocumentUrl: `/docs/${service.path}-json`,
    })

    return document
  })

  SwaggerModule.setup('docs', app, documents[0], {
    explorer: true,
    swaggerOptions: { urls },
  })
}
