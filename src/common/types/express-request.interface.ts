import { Request } from 'express';
import { UserEntity } from '@app/modules/user/db/user.entity';

// @ts-ignore
// noinspection JSAnnotator
export interface IExpressRequest extends Request {
  user?: UserEntity;
}
