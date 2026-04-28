import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateFeatureDto {
  @ApiProperty({ example: 'notification-service' })
  name: string

  @ApiPropertyOptional({ example: 'Notification sending service' })
  description?: string
}
