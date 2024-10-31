import { Injectable } from '@angular/core';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { IUserInfoResponse } from 'src/app/core/store/_auth/_auth.types';
import { IResponseTemplate } from 'src/app/core/types/api.types';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private _apiCallerService: ApiCallerService) { }

  getUserInfo() {
    return this._apiCallerService.get<null, IResponseTemplate<IUserInfoResponse>>(environment.authEndpoint.getUserInfo).pipe(
      map(res => res.data)
    )
  }
}
