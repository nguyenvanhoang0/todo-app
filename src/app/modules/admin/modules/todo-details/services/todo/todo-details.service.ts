import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { environment } from 'src/environments/environment';
import { IBucket } from '../../../todo/types/todo.type';
import { IResponseTemplate } from 'src/app/core/types/api.types';

@Injectable({
  providedIn: 'root'
})
export class TodoDetailsService {

  apiUrl = environment.bucketsEndpoint;

  constructor(private _apiCallerService: ApiCallerService) { }

  getBucketById(id: number): Observable<IResponseTemplate<IBucket>> {
    return this._apiCallerService.get<number , IResponseTemplate<IBucket>>(this.apiUrl.getBucketById , id);
  }

}
