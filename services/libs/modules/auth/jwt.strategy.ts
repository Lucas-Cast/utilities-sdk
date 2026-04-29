import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { environment } from 'libs/config/environment'
import { ExtractJwt, Strategy } from 'passport-jwt'

export interface JwtPayload {
  sub: string
  name: string
  features: string[]
}
export const JWT_STRATEGY_TOKEN = 'jwt-strategy'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_TOKEN) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.JWT_SECRET,
    })
  }

  validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      name: payload.name,
      features: payload.features,
    }
  }
}
