import { Component, OnDestroy } from '@angular/core';
import { IRegisterFormGroup } from '../../types/auth.types';
import { AuthFormService } from '../../services/form/auth-form.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthApiService } from '../../services/api/auth-api.service';
import { Subject } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  private _unsubscribe$ = new Subject<void>();

  registerFormGroup: FormGroup<IRegisterFormGroup> =
    this._authFormService.registerFormGroup;

  constructor(
    private _router: Router,
    private _authFormService: AuthFormService,
    private _authApiService: AuthApiService,
    public message: MessageService
  ) {}

  get registerFormControl() {
    return this.registerFormGroup.controls;
  }

  onSubmit() {
    if (this.registerFormGroup.invalid) {
      Object.values(this.registerFormControl).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
        }
      });
    } else {
      this.message.createMessageloading();
      this._authApiService
        .Register(this.registerFormGroup.getRawValue())
        .subscribe({
          next: (response) => {
            this.message.createMessage('success', response);
            this._router.navigate(['/auth/signIn']);
          },
          error: (err) => {
            this.message.createMessage('error', err.error);
            console.error('Registration error:', err);
          },
        });
    }
  }

  handleClickSignIn() {
    this._router.navigate(['/auth/signIn']);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this.message.destroy();
  }
}
