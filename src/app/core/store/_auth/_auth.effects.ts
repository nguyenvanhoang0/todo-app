import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IResponseTemplate } from '../../types/api.types';
import { authActions } from './_auth.actions';
import { ActionProps, ILoginPayload, ILoginResponse } from './_auth.types';
import { ApiCallerService } from '../../services/api-caller.service';
import { AuthApiService } from 'src/app/modules/auth/services/api/auth-api.service';

@Injectable()
export class AuthEffect {
  loginEffect = createEffect(() =>
    this._$actions.pipe(
      ofType(authActions.login),
      switchMap(({ payload }: ActionProps<ILoginPayload>) => {
        return this._apiCallerService
          .post<ILoginPayload, ILoginResponse>(
            environment.authEndpoint.login,
            payload
          )
          .pipe(
            tap(response => console.log('API response:', response)),
            map(response => {
              const accessToken = response.access_token;
              console.log('Login successful, access_token:', accessToken);
              return authActions.loginSuccess({ access_token: accessToken });
            }),
            catchError(error => {
              console.error('Error:', error);
              this._nzMsgService.error(error.message);
              return EMPTY;
            })
          );
      })
    ));
  
  

  constructor(
    private _$actions: Actions,
    private _apiCallerService: ApiCallerService,
    private _nzMsgService: NzMessageService,
    private authService: AuthApiService

  ) {    
  }
}
