import { PrismaModule } from '@app/database'
import { Module } from '@nestjs/common'
import { FeaturesModule } from './modules/features/features.module'

@Module({
  imports: [PrismaModule, FeaturesModule],
  controllers: [],
  providers: [],
})
export class CredentialsServiceModule {}
