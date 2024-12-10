import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginFormGroup } from '../../types/auth.types';
import { FormGroup } from '@angular/forms';
import { AuthFormService } from '../../services/form/auth-form.service';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/core/store/_auth/_auth.actions';
import { MessageService } from 'src/app/services/message/message.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; 
import { RedirectService } from 'src/app/services/redirect/redirect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFormGroup: FormGroup<ILoginFormGroup> = this._authFormService.LoginFormGroup;

  constructor(
    private _router: Router,
    private _authFormService: AuthFormService,
    private _$actions: Actions,
    private _store: Store,
    private _destroyRef: DestroyRef,
    private _redirectService: RedirectService,

    public message: MessageService,
    public translate: TranslateService
  ) {}

  get loginFormControls() {
    return this.loginFormGroup.controls;
  }

  ngOnInit(): void {
    this.subscribeLoginSuccessAction();
    const redirectUrl = this._redirectService.getRedirectUrl();
      console.log(redirectUrl);
  }

  onSubmit() {
    if (this.loginFormGroup.invalid) {
      
      Object.values(this.loginFormControls).forEach((control) => {        
        if (control.invalid) {
          control.markAsDirty();
        }
      })
    } else {
      this._store.dispatch(authActions.login({
        payload: this.loginFormGroup.getRawValue()
      }));
    }
  }

  handleClickSignUp() {
    this._router.navigate(['auth/signUp']).then();
  }

  subscribeLoginSuccessAction() {
    this._$actions.pipe(
      takeUntilDestroyed(this._destroyRef),
      ofType(authActions.loginSuccess.type)
    ).subscribe(() => {
      const redirectUrl = this._redirectService.getRedirectUrl();      
      if (redirectUrl) {
        this._redirectService.clearRedirectUrl();
        this._router.navigateByUrl(redirectUrl);
      } else {
        this._router.navigate(['admin']).then();
      }
    });
  }

  ngOnDestroy(): void {
    this.message.destroy()
  }
}


