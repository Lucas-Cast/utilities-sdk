import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JWT_STRATEGY_TOKEN } from './jwt.strategy'

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY_TOKEN) {}
