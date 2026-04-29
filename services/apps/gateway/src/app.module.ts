import { CredentialsServiceModule } from '@app/credentials/credentials-service.module'
import { Module } from '@nestjs/common'
import { AuthModule } from 'libs/modules/auth/auth.module'

@Module({
  imports: [CredentialsServiceModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
