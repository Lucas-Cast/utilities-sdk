import { Test, TestingModule } from '@nestjs/testing';
import { CredentialsServiceController } from './credentials-service.controller';
import { CredentialsServiceService } from './credentials-service.service';

describe('CredentialsServiceController', () => {
  let credentialsServiceController: CredentialsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CredentialsServiceController],
      providers: [CredentialsServiceService],
    }).compile();

    credentialsServiceController = app.get<CredentialsServiceController>(CredentialsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(credentialsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
