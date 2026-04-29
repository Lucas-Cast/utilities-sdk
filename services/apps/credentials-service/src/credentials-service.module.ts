import { Module } from '@nestjs/common'
import { PrismaModule } from 'libs/modules/database'
import { ClientsModule } from './modules/clients/clients.module'
import { FeaturesModule } from './modules/features/features.module'

@Module({
  imports: [PrismaModule, FeaturesModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class CredentialsServiceModule {}
