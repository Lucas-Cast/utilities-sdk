import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { environment } from 'libs/config/environment'
import { ClientsController } from './clients.controller'
import { ClientsRepository } from './clients.repository'
import { ClientsService } from './clients.service'

@Module({
  imports: [
    JwtModule.register({
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: environment.JWT_EXPIRES_IN as any },
    }),
  ],
  controllers: [ClientsController],
  providers: [ClientsService, ClientsRepository],
  exports: [ClientsService],
})
export class ClientsModule {}
