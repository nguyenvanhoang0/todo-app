import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { environment } from 'src/environments/environment';
import { IBucketItemSimple } from '../../types/bucket-item.type';
import { IResponseTemplate } from 'src/app/core/types/api.types';
import { IBucketItem } from 'src/app/modules/admin/modules/todo-details/types/todo-item.type';

@Injectable({
  providedIn: 'root',
})
export class BucketItemService {
  private apiBucket = environment.bucketsEndpoint;
  private apiBucketItem = environment.bucketitemsEndpoint;

  constructor(private apiCallerService: ApiCallerService) {}

  createBucketItem(bucketId: number, bucketItem: IBucketItemSimple): Observable<IResponseTemplate<IBucketItem[]>> {
    console.log(bucketItem);
    
    return this.apiCallerService.post(
      `${this.apiBucket.getBucketById}${bucketId}${this.apiBucketItem.createBucketItem}`,
      bucketItem
    );
  }

  updateBucketItem(bucketItem: IBucketItemSimple, id: number , parentId: number): Observable<string> {
    return this.apiCallerService.patch<IBucketItemSimple, string>(
      `${this.apiBucket.getBucketById}${parentId}${this.apiBucketItem.createBucketItem}/${id}`,
      bucketItem
    );
  }

  deleteBucketItem(id: number, parentId: number): Observable<string> {
    return this.apiCallerService.delete<void, string>(
      `${this.apiBucket.getBucketById}${parentId}${this.apiBucketItem.createBucketItem}/${id}`
    );
  }
}
