import { Injectable } from '@angular/core';
import {
  ILoginFormGroup,
  IRegisterFormGroup,
} from '../../types/auth.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthFormService {
  private _loginFormGroup!: FormGroup<ILoginFormGroup>;
  private _registerFormGroup!: FormGroup<IRegisterFormGroup>;

  constructor(private _formBuilder: FormBuilder) {}

  get registerFormGroup() {
    if (!this._registerFormGroup) {
      this.initRegisterForm();
    }

    return this._registerFormGroup;
  }

  get LoginFormGroup() {
    if (!this._loginFormGroup) {
      this.initLoginForm();
    }

    return this._loginFormGroup;
  }

  private initLoginForm() {
    const fb = this._formBuilder.nonNullable;
    this._loginFormGroup = fb.group({
      email: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required]),
    });
  }

  private initRegisterForm() {
    const fb = this._formBuilder.nonNullable;
    this._registerFormGroup = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [Validators.required]),
      username: fb.control('', [Validators.required, Validators.minLength(3)]),
    });
  }
}
