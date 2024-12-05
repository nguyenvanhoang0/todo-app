import { Injectable } from '@angular/core';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import {
  ILoginPayload,
  ILoginResponse,
  IUserInfoResponse,
} from 'src/app/core/store/_auth/_auth.types';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IRegister } from '../../types/auth.types';
import { MessageService } from 'src/app/services/message/message.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/core/store/_auth/_auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  apiUrl = environment.authEndpoint;

  constructor(
    private _apiCallerService: ApiCallerService,
    private _message: MessageService,
    private _http: HttpClient,
    private _router: Router,
    private _store: Store
  ) {}

  login(payload: ILoginPayload): Observable<ILoginResponse> {
    return this._apiCallerService.post<ILoginPayload, ILoginResponse>(
      environment.authEndpoint.login,
      payload
    );
  }

  getUserInfo(): Observable<IUserInfoResponse> {
    return this._apiCallerService.get<null, IUserInfoResponse>(
      this.apiUrl.getUserInfo
    );
  }

  getAvatar(): Observable<string> {
    return this._http.get(`${environment.apiUrl}${this.apiUrl.avatar}`, {
      responseType: 'text',
    });
  }

  Register(data: IRegister): Observable<string> {
    return this._apiCallerService.post<IRegister, string>(
      this.apiUrl.register,
      data
    );
  }

  logout() {
    this._message.createMessage('success', 'sign out success');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    this._store.dispatch(authActions.logout());
    this._router.navigate(['/auth/signIn']);
  }
}
