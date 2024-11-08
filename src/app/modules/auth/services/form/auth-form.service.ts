import { Injectable } from '@angular/core';
import {
  ILoginFormGroup,
  IRegisterFormGroup,
  IUpdateUserFormGroup,
} from '../../types/auth.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthFormService {
  private _loginFormGroup!: FormGroup<ILoginFormGroup>;
  private _registerFormGroup!: FormGroup<IRegisterFormGroup>;
  private _updateUserGroup!: FormGroup<IUpdateUserFormGroup>;

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

  get UpdateUserGroup() {
    if (!this._updateUserGroup) {
      this.initUpdateUserForm();
    }

    return this._updateUserGroup;
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

  private initUpdateUserForm() {
    const fb = this._formBuilder.nonNullable;
    this._updateUserGroup = fb.group({
      email: fb.control('', [Validators.email]),
      username: fb.control('', [Validators.required, Validators.minLength(3)]),
      avatar: fb.control<File | null>(null, [Validators.required]),
    });
  }
}
