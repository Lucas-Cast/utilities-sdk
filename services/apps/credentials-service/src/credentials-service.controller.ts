import { Controller, Get } from '@nestjs/common';
import { CredentialsServiceService } from './credentials-service.service';

@Controller()
export class CredentialsServiceController {
  constructor(private readonly credentialsServiceService: CredentialsServiceService) {}

  @Get()
  getHello(): string {
    return this.credentialsServiceService.getHello();
  }
}
