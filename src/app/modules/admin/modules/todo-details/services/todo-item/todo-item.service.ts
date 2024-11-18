import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { IResponseTemplate } from 'src/app/core/types/api.types';
import { IQueryParams } from 'src/app/modules/admin/types/query-params.type';
import { environment } from 'src/environments/environment';
import { IBucketItem } from '../../types/todo-item.type';

@Injectable({
  providedIn: 'root',
})
export class TodoItemService {
  private apiBucket = environment.bucketsEndpoint;
  private apiBucketItem = environment.bucketitemsEndpoint;

  constructor(private _apiCallerService: ApiCallerService) {}

  getBucketItems(
    parentId: number,
    params?: IQueryParams
  ): Observable<IResponseTemplate<IBucketItem[]>> {
    const endpoint = `${this.apiBucket.getBucketById}${parentId}${this.apiBucketItem.getBucketItem}`;
    return this._apiCallerService.get<
      IQueryParams,
      IResponseTemplate<IBucketItem[]>
    >(endpoint, params);
  }

  getBucketItemsById(
    id: number,
    parentId: number
  ): Observable<IResponseTemplate<IBucketItem>> {
    const endpoint = `${this.apiBucket.getBucketById}${parentId}${this.apiBucketItem.getBucketItem}/`;

    return this._apiCallerService.get(endpoint, id);
  }
}
