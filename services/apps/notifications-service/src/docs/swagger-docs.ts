import { ApiBodyOptions, getSchemaPath } from '@nestjs/swagger'
import {
  BrevoEmailNotificationDto,
  EmailNotificationDto,
  SmsNotificationDto,
  WhatsappNotificationDto,
} from '../dto/send-notification.dto'
import { extractExample } from './extract-example'

type Constructor<T = unknown> = new () => T

function example<T>(label: string, dto: Constructor<T>) {
  return { [label]: { summary: label, value: extractExample(dto) } }
}

const notificationSchemas = [
  EmailNotificationDto,
  SmsNotificationDto,
  WhatsappNotificationDto,
  BrevoEmailNotificationDto,
]

export const sendNotificationBody: ApiBodyOptions = {
  schema: {
    oneOf: notificationSchemas.map((dto) => ({ $ref: getSchemaPath(dto) })),
  },
  examples: {
    ...example('Send Email', EmailNotificationDto),
    ...example('Send SMS', SmsNotificationDto),
    ...example('Send WhatsApp', WhatsappNotificationDto),
    ...example('Send Email via Brevo', BrevoEmailNotificationDto),
  },
}
