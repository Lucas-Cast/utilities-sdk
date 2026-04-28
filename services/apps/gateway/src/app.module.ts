import { CredentialsServiceModule } from '@app/credentials/credentials-service.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [CredentialsServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
