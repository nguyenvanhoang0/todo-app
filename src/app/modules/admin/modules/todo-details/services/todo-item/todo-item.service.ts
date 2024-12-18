import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { IResponseTemplate } from 'src/app/core/types/api.types';
import { IQueryParams } from 'src/app/modules/admin/types/query-params.type';
import { environment } from 'src/environments/environment';
import { IBucketItem } from '../../types/todo-item.type';
import { BucketItemService } from 'src/app/shared/components/open-form/services/bucket-item/bucket-item.service';

@Injectable({
  providedIn: 'root',
})
export class TodoItemService {
  private apiBucket = environment.bucketsEndpoint;
  private apiBucketItem = environment.bucketitemsEndpoint;

  constructor(
    private _apiCallerService: ApiCallerService,
    private _bucketItemService: BucketItemService
  ) {}

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

  updateMultipleBucketItems(
    bucketItems: IBucketItem[],
    parentId: number
  ): Observable<string[]> {
    const updateRequests: Observable<string>[] = bucketItems.map((item) => {
      const updatedItem = { ...item, done: true }; // Cập nhật `done = true`
      return this._bucketItemService.updateBucketItem(
        updatedItem,
        item.id,
        parentId
      );
    });
    return forkJoin(updateRequests);
  }

  deleteMultipleBucketItems(
    ids: number[],
    parentId: number
  ): Observable<string[]> {
    const deleteRequests: Observable<string>[] = ids.map((id) =>
      this._bucketItemService.deleteBucketItem(id, parentId)
    );
    return forkJoin(deleteRequests);
  }
}
