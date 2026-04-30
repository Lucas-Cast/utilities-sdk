import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from './decorators/public.decorator'
import { FEATURE_KEY } from './decorators/require-feature.decorator'
import { JWT_STRATEGY_TOKEN } from './jwt.strategy'

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY_TOKEN) {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) return true

    return super.canActivate(context)
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const authenticatedUser = super.handleRequest(err, user, info, context)

    const requiredFeature = this.reflector.getAllAndOverride<string>(FEATURE_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (requiredFeature && !authenticatedUser.features?.includes(requiredFeature)) {
      throw new ForbiddenException(`Access denied: feature "${requiredFeature}" is required`)
    }

    return authenticatedUser
  }
}
