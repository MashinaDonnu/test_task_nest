import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IExpressRequest } from '@app/common/types/express-request.interface';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = GqlExecutionContext.create(ctx).getContext().req as IExpressRequest;

  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
});
