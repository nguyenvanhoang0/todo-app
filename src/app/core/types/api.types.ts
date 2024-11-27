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

export type IResponseTemplate<T = null> = {
  message: string,
  data: T,
  errors: IErrorResponse[],
  total: number
}

export type IErrorResponse = {
  target: string,
  detail: string
}
