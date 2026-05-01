import { Body, Controller, Post, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { FeatureEnum } from 'libs/enums/feature-enum'
import { RequireFeature } from 'libs/modules/auth/decorators/require-feature.decorator'
import { sendNotificationBody } from './docs/swagger-docs'
import {
  BrevoEmailNotificationDto,
  EmailNotificationDto,
  SendNotificationDto,
  SmsNotificationDto,
  WhatsappNotificationDto,
} from './dto/send-notification.dto'
import { NotificationsService } from './notifications.service'

@ApiBearerAuth()
@ApiTags('Notifications')
@Controller('notifications')
@RequireFeature(FeatureEnum.NOTIFICATION_SERVICE)
@ApiExtraModels(
  EmailNotificationDto,
  SmsNotificationDto,
  WhatsappNotificationDto,
  BrevoEmailNotificationDto,
)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Send a notification' })
  @ApiBody(sendNotificationBody)
  send(@Body() dto: SendNotificationDto, @Req() req: Request) {
    return this.notificationsService.send(dto, req.headers.authorization)
  }
}
