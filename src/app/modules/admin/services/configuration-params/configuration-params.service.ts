import { Injectable } from '@angular/core';
import { IQueryParams } from '../../types/query-params.type';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationParamsService {
  private defaultParamsConfiguration: IQueryParams = {
    limit: 12,
    page: 1,
  };

  paramsConfiguration: IQueryParams = this.defaultParamsConfiguration;

  getDefaultParamsConfiguration(page?: number,done?: 0 | 1,  limit?: number ): IQueryParams {
    return {
      ...this.defaultParamsConfiguration,
      ...(done !== undefined ? { done } : {}),
      ...(page !== undefined ? { page } : {}),
      ...(limit !== undefined ? { limit } : {}),
    };
  }
}
