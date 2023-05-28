import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IExpressRequest } from '@app/common/types/express-request.interface';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<IExpressRequest>();

  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }
  return request.user;
});