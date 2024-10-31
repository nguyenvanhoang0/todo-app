import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IResponseTemplate } from '../../types/api.types';
import { authActions } from './_auth.actions';
import { ActionProps, ILoginPayload, ILoginResponse } from './_auth.types';
import { ApiCallerService } from '../../services/api-caller.service';

@Injectable()
export class AuthEffect {
  loginEffect = createEffect(() =>
    this._$actions.pipe(
      ofType(authActions.login.type),
      switchMap(({ payload }: ActionProps<ILoginPayload>) => {
        return this._apiCallerService
          .post<ILoginPayload, IResponseTemplate<ILoginResponse>>(
            environment.authEndpoint.login,
            payload
          )
          .pipe(
            map(({ data }) => {
              return authActions.loginSuccess(data);
            }),
            catchError(({ message }: IResponseTemplate) => {
              this._nzMsgService.error(message);
              return EMPTY;
            })
          );
      })
    )
  );

  constructor(
    private _$actions: Actions,
    private _apiCallerService: ApiCallerService,
    private _nzMsgService: NzMessageService
  ) {
    
  }
}
