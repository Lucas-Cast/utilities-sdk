import { CredentialsServiceModule } from '@app/credentials/credentials-service.module'
import { PrismaModule } from '@lib/modules/database/prisma.module'
import { Module } from '@nestjs/common'
import { NotificationsServiceModule } from 'apps/notifications-service/src/notifications.module'
import { AuthModule } from 'libs/modules/auth/auth.module'

@Module({
  imports: [CredentialsServiceModule, NotificationsServiceModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
