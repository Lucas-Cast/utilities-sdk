import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateFeatureDto {
  @ApiPropertyOptional({ example: 'notification-service' })
  name?: string

  @ApiPropertyOptional({ example: 'Notification sending service' })
  description?: string

  @ApiPropertyOptional({ example: true })
  isActive?: boolean
}
