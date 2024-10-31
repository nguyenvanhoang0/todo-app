import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import _ from "lodash";
import { HttpRequestOptions } from '../types/api.types';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  constructor(private _httpClient: HttpClient) {
  }

  public get<T, U>(endpoint: string, params?: T, options?: HttpRequestOptions) {
    return this._httpClient.get<U>(environment.apiUrl + endpoint + this._objectToRequestParams(params), options);
  }

  public post<T, U>(endpoint: string, body?: T, options?: HttpRequestOptions) {
    return this._httpClient.post<U>(environment.apiUrl + endpoint, body || {}, options);
  }

  public put<T, U>(endpoint: string, body?: T, options?: HttpRequestOptions) {
    return this._httpClient.put<U>(environment.apiUrl + endpoint, body || {}, options);
  }

  public patch<U>(endpoint: string, body?: any, options?: HttpRequestOptions) {
    return this._httpClient.patch<U>(environment.apiUrl + endpoint, body, options);
  }

  private _objectToRequestParams<T>(obj?: T): string {
    if (!obj) return '';

    if (_.isObject(obj)) {
      return Object.entries(obj).reduce((prev, [key, value], index) => {
        prev += (index === 0 ? `?` : `&`) + `${key}=${value}`;
        return prev;
      }, '')
    }
    return obj;
  }
}
