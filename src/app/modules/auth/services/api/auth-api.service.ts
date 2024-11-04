import { Injectable } from '@angular/core';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { IUserInfoResponse } from 'src/app/core/store/_auth/_auth.types';
import { environment } from 'src/environments/environment';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IRegister, IRegisterFormGroup } from '../../types/auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  apiUrl = environment.authEndpoint;

  constructor(private _apiCallerService: ApiCallerService) { }

  getUserInfo(accessToken: string): Observable<IUserInfoResponse>  {
    const params = { access_token: accessToken };
    return this._apiCallerService.get<{ access_token: string }, IUserInfoResponse>(this.apiUrl.getUserInfo , params);
  }

  Register(data : IRegister): Observable<string> {
    console.log(data);
    
    return this._apiCallerService.post<IRegister, string>(this.apiUrl.register , data);  
  }
}
