import { Injectable } from '@angular/core';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { IUserInfoResponse } from 'src/app/core/store/_auth/_auth.types';
import { environment } from 'src/environments/environment';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private _apiCallerService: ApiCallerService) { }

  getUserInfo(accessToken: string): Observable<IUserInfoResponse>  {
    const apiUrl = environment.authEndpoint.getUserInfo;
    const params = { access_token: accessToken };
    return this._apiCallerService.get<{ access_token: string }, IUserInfoResponse>(apiUrl , params);
  }
}
