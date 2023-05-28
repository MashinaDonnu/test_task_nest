import { HttpException, HttpStatus } from '@nestjs/common';

export interface IResponseError {
  statusCode: HttpStatus;
  errors?: IResponseErrorItems;
  error?: any;
  message: string;
}

export interface IResponseErrorItems {
  [key: string]: string[] | string;
}
