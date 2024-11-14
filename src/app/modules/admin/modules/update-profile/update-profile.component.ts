import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUpdateUserFormGroup } from './types/update-user.type';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UpdateUserFormService } from './services/form/update-user-form.service';
import { UserService } from './services/user/user.service';
import { MessageService } from 'src/app/services/message/message.service';
import { IUserInfo } from 'src/app/core/store/_auth/_auth.types';
import { selectUserInfo } from 'src/app/core/store/_auth/_auth.selectors';
import { MainState } from 'src/app/core/store/_store.types';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
})
export class UpdateProfileComponent implements OnDestroy ,OnInit {
  updateUserFormGroup: FormGroup<IUpdateUserFormGroup> =
    this._updateUserService.UpdateUserGroup;
  private _unsubscribe$ = new Subject<void>();

  userInfo$: Observable<IUserInfo | undefined> =
    this._store.select(selectUserInfo);

  constructor(
    private _store: Store<MainState>,
    private _router: Router,
    private _updateUserService: UpdateUserFormService,
    private _authApiService: UserService,
    public message: MessageService
  ) {}

  get registerFormControl() {
    return this.updateUserFormGroup.controls;
  }

  ngOnInit(): void {
    this.userInfo$.subscribe((userInfo) => {
      if (userInfo) {
        this.updateUserFormGroup.patchValue({
          email: userInfo.email,
          username: userInfo.username,
        });
      }
    });
  }
  onFileUploaded(file: File) {
    this.updateUserFormGroup.controls.avatar.setValue(file);
    console.log(file);
    console.log(this.updateUserFormGroup.getRawValue());
  }

  onSubmit() {
    if (this.updateUserFormGroup.invalid) {
      Object.values(this.updateUserFormGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    } else {
      this.message.createMessageloading();
      this._authApiService
        .updateUser(this.updateUserFormGroup.getRawValue())
        .subscribe(
          (response) => {
            this.message.createMessage(
              'success',
              'Cập nhật thông tin thành công'
            );
            console.log('Update success:', response);
          },
          (error) => {
            this.message.createMessage('error', error);
            console.error('Update error:', error);
          }
        );
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
