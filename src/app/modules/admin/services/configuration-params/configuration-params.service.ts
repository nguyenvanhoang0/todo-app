import { Injectable } from '@angular/core';
import { IQueryParams } from '../../types/query-params.type';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationParamsService {

  private defaultParamsConfiguration: IQueryParams = {
    limit: 12,
    page: 1,
  };

  paramsConfiguration: IQueryParams = this.defaultParamsConfiguration;

  // loadparamsConfiguration(): void {
  //   this.paramsConfiguration = this.getStoredValue<IQueryParams>('configParams', JSON.parse, this.paramsConfiguration);
  // }

  // private getStoredValue<T>(key: string, parser: (value: string) => T, defaultValue: T): T {
  //   const storedValue = localStorage.getItem(key);  
  //   return storedValue ? parser(storedValue) : defaultValue;
  // }

  getDefaultParamsConfiguration(): IQueryParams {
    console.log(1);
    console.log(2);
    
    return this.defaultParamsConfiguration;
  }
}
