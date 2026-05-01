import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { environment } from 'libs/config/environment'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name)

  constructor(private readonly http: HttpService) {}

  async send(data: any, token?: string) {
    const { data: response } = await firstValueFrom(
      this.http.post(`${environment.NOTIFICATIONS_API_URL}/notifications/send`, data, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      }),
    )
    this.logger.log(`Notification sent successfully`)
    return response
  }
}
