import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { IResponseTemplate } from 'src/app/core/types/api.types';
import { IQueryParams } from 'src/app/modules/admin/types/query-params.type';
import { environment } from 'src/environments/environment';
import { IBucket } from '../../types/todo.type';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl = environment.bucketsEndpoint;

  constructor(private _apiCallerService: ApiCallerService) { }

  getBuckets(params?: IQueryParams): Observable<IResponseTemplate<IBucket[]>> {
    return this._apiCallerService.get<IQueryParams, IResponseTemplate<IBucket[]>>(this.apiUrl.getBuckets, params);
  }
}
