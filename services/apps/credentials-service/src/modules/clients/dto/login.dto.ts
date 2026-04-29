import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: 'my-app' })
  name: string

  @ApiProperty({ example: 'my-secret' })
  secret: string
}
