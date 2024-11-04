import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRegisterFormGroup } from '../../types/auth.types';
import { AuthFormService } from '../../services/form/auth-form.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerFormGroup!: FormGroup<IRegisterFormGroup>;

  constructor(
    private _router: Router,
    private _authFormService: AuthFormService
  ) {
  }

  get registerFormControl() {
    return this.registerFormGroup.controls;
  }

  ngOnInit() {
    this.registerFormGroup = this._authFormService.registerFormGroup;
  }

  handleClickSignIn() {
    this._router.navigate(['/auth/signIn'])
  }
}
