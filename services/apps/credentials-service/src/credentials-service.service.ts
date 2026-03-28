import { Injectable } from '@nestjs/common';

@Injectable()
export class CredentialsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
