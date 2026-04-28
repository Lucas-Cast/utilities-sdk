import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateClientDto {
  @ApiPropertyOptional({ example: 'my-web-app' })
  name?: string

  @ApiPropertyOptional({ example: 'new-secret-password' })
  secret?: string

  @ApiPropertyOptional({ example: true })
  isActive?: boolean

  @ApiPropertyOptional({ example: ['feature-uuid-1', 'feature-uuid-2'] })
  featureIds?: string[]
}
