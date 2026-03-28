import { Module } from '@nestjs/common';
import { CredentialsServiceController } from './credentials-service.controller';
import { CredentialsServiceService } from './credentials-service.service';

@Module({
  imports: [],
  controllers: [CredentialsServiceController],
  providers: [CredentialsServiceService],
})
export class CredentialsServiceModule {}
