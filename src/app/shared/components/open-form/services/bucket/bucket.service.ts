import { Injectable } from '@angular/core';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { environment } from 'src/environments/environment';
import { Ibucket } from '../../types/bucket.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BucketService {
  private apiUrl = environment.bucketsEndpoint;

  constructor(private apiCallerService: ApiCallerService) {}

  createBucket(bucket: Ibucket): Observable<string> {
    console.log(bucket);
    
    return this.apiCallerService.post<Ibucket, string>(
      this.apiUrl.createBucket,
      bucket
    );
  }
}
