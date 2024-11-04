import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginFormGroup } from '../../types/auth.types';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthFormService } from '../../services/form/auth-form.service';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/core/store/_auth/_auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFormGroup!: FormGroup<ILoginFormGroup>;
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _authFormService: AuthFormService,
    private _$actions: Actions,
    private _store: Store
  ) {}

  get loginFormControls() {
    return this.loginFormGroup.controls;
  }

  ngOnInit(): void {
    this.loginFormGroup = this._authFormService.LoginFormGroup;
    this.subscribeLoginSuccessAction();
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

  subscribeLoginSuccessAction() {
    this._$actions.pipe(
      takeUntil(this._unsubscribe$),
      ofType(authActions.loginSuccess.type)
    ).subscribe((() => {
      this._router.navigate(['admin']).then();
    }))
  }

  handleClickSignUp() {
    this._router.navigate(['auth/signUp']).then();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}


