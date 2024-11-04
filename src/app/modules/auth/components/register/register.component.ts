import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRegisterFormGroup } from '../../types/auth.types';
import { AuthFormService } from '../../services/form/auth-form.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthApiService } from '../../services/api/auth-api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerFormGroup!: FormGroup<IRegisterFormGroup>;

  constructor(
    private _router: Router,
    private _authFormService: AuthFormService,
    private authApiService: AuthApiService,
    private _nzMsgService: NzMessageService,
  ) {}

  get registerFormControl() {
    return this.registerFormGroup.controls;
  }

  ngOnInit() {
    this.registerFormGroup = this._authFormService.registerFormGroup;
  }

  onSubmit() {
    if (this.registerFormGroup.invalid) {
      Object.values(this.registerFormControl).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
        }
      });
    } else {
      this.authApiService.Register(this.registerFormGroup.getRawValue()).subscribe(
        response => {
          this._nzMsgService.success(response);
        },
        error => {
          this._nzMsgService.error(error);
          console.error('Registration error:', error);
        }
      );
    }
  }

  handleClickSignIn() {
    this._router.navigate(['/auth/signIn']);
  }
}
