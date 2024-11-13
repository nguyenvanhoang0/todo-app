import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUpdateUserFormGroup } from '../../types/update-user.type';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserFormService {
  private _updateUserGroup!: FormGroup<IUpdateUserFormGroup>;

  constructor(private _formBuilder: FormBuilder) { }


  get UpdateUserGroup() {
    if (!this._updateUserGroup) {
      this.initUpdateUserForm();
    }

    return this._updateUserGroup;
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
