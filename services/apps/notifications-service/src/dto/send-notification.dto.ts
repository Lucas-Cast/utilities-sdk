import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { NotificationType } from '../enum/notification-type'

export class NameEmail {
  @ApiProperty({ example: 'John Doe' })
  name: string

  @ApiProperty({ example: 'john@example.com' })
  email: string
}

export class EmailNotificationDto {
  @ApiProperty({ enum: [NotificationType.EMAIL], example: NotificationType.EMAIL })
  type: NotificationType.EMAIL

  @ApiProperty({ example: '<h1>Hello!</h1>' })
  emailBody: string

  @ApiProperty({ type: NameEmail })
  recipientEmail: NameEmail

  @ApiProperty({ example: 'Welcome!' })
  subject: string

  @ApiPropertyOptional({ example: 'smtp.gmail.com' })
  mailServer?: string

  @ApiPropertyOptional({ example: 587 })
  mailPort?: number

  @ApiProperty({ example: 'My App' })
  mailFromName: string
}

export class SmsNotificationDto {
  @ApiProperty({ enum: [NotificationType.SMS], example: NotificationType.SMS })
  type: NotificationType.SMS

  @ApiProperty({ example: '+5511999999999' })
  recipientPhoneNumber: string

  @ApiProperty({ example: 'Your code is 1234' })
  smsBody: string
}

export class WhatsappNotificationDto {
  @ApiProperty({ enum: [NotificationType.WHATSAPP], example: NotificationType.WHATSAPP })
  type: NotificationType.WHATSAPP

  @ApiProperty({ example: '+5511999999999' })
  recipientPhoneNumber: string

  @ApiProperty({ example: 'HXxxxxxxxxxxxxxx' })
  contentSid: string

  @ApiPropertyOptional({ example: { '1': 'John', '2': '1234' } })
  contentVariables?: Record<string, string | number>
}

export class BrevoEmailNotificationDto {
  @ApiProperty({ enum: [NotificationType.BREVO_EMAIL], example: NotificationType.BREVO_EMAIL })
  type: NotificationType.BREVO_EMAIL

  @ApiProperty({ example: '<h1>Hello!</h1>' })
  emailBody: string

  @ApiProperty({ example: 'user@example.com' })
  recipientEmail: string

  @ApiProperty({ example: 'Welcome!' })
  subject: string
}

export type SendNotificationDto =
  | EmailNotificationDto
  | SmsNotificationDto
  | WhatsappNotificationDto
  | BrevoEmailNotificationDto
