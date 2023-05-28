import { IResponse } from '@app/common/types/response.interface';
import { IResponseError } from '@app/common/types/response-error.interface';

export class ResponseService {
  public response<T>(data: T): IResponse<T> {
    return {
      success: true,
      data,
      error: null,
    };
  }

  public exceptionResponse(error: IResponseError): IResponse<null> {
    return {
      success: false,
      data: null,
      error,
    };
  }
}
