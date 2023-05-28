import { IResponseError } from '@app/common/types/response-error.interface';

export interface IResponse<T> {
  success: boolean;
  data: T;
  error: IResponseError | null;
}
