import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { authActions } from './_auth.actions';
import { ActionProps, ILoginPayload, ILoginResponse } from './_auth.types';
import { ApiCallerService } from '../../services/api-caller.service';
import { MessageService } from 'src/app/services/message/message.service';
import { AuthApiService } from 'src/app/modules/auth/services/api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect {
  loginEffect = createEffect(() =>
    this._$actions.pipe(
      ofType(authActions.login),
      switchMap(({ payload }: ActionProps<ILoginPayload>) => {
        this.message.createMessageloading();
        return this._authApiService.login(payload).pipe(
          map((response) => {
            const accessToken = response.access_token;
            this.message.createMessage('success', 'Login Success');
            return authActions.loginSuccess({ access_token: accessToken });
          }),
          catchError((error) => {
            console.error('Error:', error);
            this.message.createMessage('error', 'Login failed: ' + error.message);
            return EMPTY;
          })
        );
      })
    )
  );
  
  constructor(
    private _$actions: Actions,
    private _apiCallerService: ApiCallerService,
    private _authApiService: AuthApiService,

    private message: MessageService
  ) {}
}
