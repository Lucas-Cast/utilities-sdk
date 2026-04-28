import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateClientDto {
  @ApiProperty({ example: 'my-web-app' })
  name: string

  @ApiProperty({ example: 'my-secret-password' })
  secret: string

  @ApiPropertyOptional({ example: ['feature-uuid-1', 'feature-uuid-2'] })
  featureIds?: string[]
}
