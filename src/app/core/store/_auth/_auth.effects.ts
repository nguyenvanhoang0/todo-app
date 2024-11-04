import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap} from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { authActions } from './_auth.actions';
import { ActionProps, ILoginPayload, ILoginResponse } from './_auth.types';
import { ApiCallerService } from '../../services/api-caller.service';

@Injectable({
  providedIn: 'root'
})
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
            map(response => {
              const accessToken = response.access_token;
              this._nzMsgService.success("Login Success");
              return authActions.loginSuccess({ access_token: accessToken });
            }),
            catchError(error => {
              console.error('Error:', error);
              this._nzMsgService.error(error);
              return EMPTY;
            })
          );
      })
    ));

  constructor(
    private _$actions: Actions,
    private _apiCallerService: ApiCallerService,
    private _nzMsgService: NzMessageService,
  ) {    
  }
}
