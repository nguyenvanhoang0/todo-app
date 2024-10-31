import {HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";

export type HttpRequestOptions = {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export enum EResponseStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  FAIL = 'FAIL'
}

export interface IResponseTemplate<T = null> {
  message: string,
  data: T,
  errors: IErrorResponse[],
  status: EResponseStatus
}

export interface IErrorResponse {
  target: string,
  detail: string
}
