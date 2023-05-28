import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UserService } from '@app/modules/user/user.service';
import { IExpressRequest } from '@app/common/types/express-request.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IExpressRequest, res: Response, next: NextFunction): Promise<any> {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, process.env.AT_SECRET);
      req.user = await this.userService.findById((<JwtPayload>decode).id);
      next();
    } catch (e) {
      req.user = null;
      next();
    }
  }
}
