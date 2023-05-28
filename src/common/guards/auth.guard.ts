import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IExpressRequest } from '@app/common/types/express-request.interface';
import { Reflector } from '@nestjs/core';
import { ResponseService } from '@app/services/response.service';
import { ROLES_KEY } from '@app/common/decorators/permission.decorator';
import { UserEntity } from '@app/modules/user/db/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly responseService: ResponseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IExpressRequest>();

    if (!request.user) {
      throw new HttpException(
        this.responseService.exceptionResponse({
          message: 'Not authorized',
          statusCode: HttpStatus.FORBIDDEN,
        }),
        HttpStatus.FORBIDDEN,
      );
    }

    try {
      const req = context.switchToHttp().getRequest();
      const currentUser = req.user as UserEntity;

      const isHavePermissions = await this.isHavePermissions(currentUser, context);
      if (isHavePermissions) {
        return true;
      }

      throw new HttpException('No permissions', HttpStatus.FORBIDDEN);
    } catch (e) {
      throw new HttpException(
        this.responseService.exceptionResponse({
          message: 'You don`t have a permissions',
          statusCode: HttpStatus.FORBIDDEN,
        }),
        HttpStatus.FORBIDDEN,
      );
    }
  }

  private async isHavePermissions(user: UserEntity, context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }
    return requiredRoles.includes(user.role);
  }
}
