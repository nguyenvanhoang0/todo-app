import { Injectable } from '@angular/core';
import { IBucketItem } from '../../modules/todo-details/types/todo-item.type';
import { IBucket } from '../../modules/todo/types/todo.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private bucketItemSubject = new BehaviorSubject<IBucketItem[]>([]);
  bucketItem$ = this.bucketItemSubject.asObservable();

  private bucketSubject = new BehaviorSubject<IBucket[]>([]);
  bucket$ = this.bucketSubject.asObservable();

  toggleBucketItem(item: IBucketItem): void {
    const currentBucketItems = this.bucketItemSubject.getValue();
    const index = currentBucketItems.findIndex(
      (bucketItem) => bucketItem.id === item.id
    );

    if (index === -1) {
      this.bucketItemSubject.next([...currentBucketItems, item]);
    } else {
      const updatedBucketItems = currentBucketItems.filter(
        (bucketItem) => bucketItem.id !== item.id
      );
      this.bucketItemSubject.next(updatedBucketItems);
    }
  }

  toggleBucket(bucket: IBucket): void {
    const currentBuckets = this.bucketSubject.getValue();
    const index = currentBuckets.findIndex((b) => b.id === bucket.id);

    if (index === -1) {
      this.bucketSubject.next([...currentBuckets, bucket]);
    } else {
      const updatedBuckets = currentBuckets.filter((b) => b.id !== bucket.id);
      this.bucketSubject.next(updatedBuckets);
    }
  }

  clearBucketItems(): void {
    this.bucketItemSubject.next([]);
  }

  clearBuckets(): void {
    this.bucketSubject.next([]);
  }

  getBucketItems(): IBucketItem[] {
    return this.bucketItemSubject.getValue();
  }

  getBuckets(): IBucket[] {
    return this.bucketSubject.getValue();
  }
}
