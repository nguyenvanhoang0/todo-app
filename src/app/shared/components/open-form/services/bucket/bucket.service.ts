import { Injectable } from '@angular/core';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { environment } from 'src/environments/environment';
import { IBucketSimple } from '../../types/bucket.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BucketService {
  private apiUrl = environment.bucketsEndpoint;

  constructor(private apiCallerService: ApiCallerService) {}

  createBucket(bucket: IBucketSimple): Observable<string> {
    return this.apiCallerService.post<IBucketSimple, string>(
      this.apiUrl.createBucket,
      bucket
    );
  }

  updateBucket(bucket: IBucketSimple, id: number): Observable<string> {
    return this.apiCallerService.patch<IBucketSimple, string>(
      `${this.apiUrl.updateBucket}/${id}`,
      bucket
    );
  }

  deleteBucket(id: number): Observable<string> {
    return this.apiCallerService.delete<void, string>(
      `${this.apiUrl.updateBucket}/${id}`
    );
  }
}
