import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUpdateUserFormGroup } from './types/update-user.type';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UpdateUserFormService } from './services/form/update-user-form.service';
import { UserService } from './services/user/user.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
})
export class UpdateProfileComponent implements OnDestroy{
  updateUserFormGroup: FormGroup<IUpdateUserFormGroup> = this._updateUserService.UpdateUserGroup;
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _updateUserService: UpdateUserFormService,
    private authApiService: UserService,
    public message: MessageService
  ) {}

  get registerFormControl() {
    return this.updateUserFormGroup.controls;
  }

  onFileUploaded(file: File) {
    this.updateUserFormGroup.controls.avatar.setValue(file);
    console.log(file);
    console.log(this.updateUserFormGroup.getRawValue());
    
  }

  onSubmit() {
    if (this.updateUserFormGroup.invalid) {
      // Đánh dấu các control không hợp lệ
      Object.values(this.updateUserFormGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    } else {
      // Hiển thị thông báo loading
      this.message.createMessageloading();
  
      // Gọi API cập nhật thông tin người dùng
      this.authApiService
        .updateUser(this.updateUserFormGroup.getRawValue()) // Chuyển dữ liệu form sang định dạng thô
        .subscribe(
          (response) => {
            // Hiển thị thông báo thành công
            this.message.createMessage('success', 'Cập nhật thông tin thành công');
            console.log('Update success:', response);
          },
          (error) => {
            // Hiển thị thông báo lỗi và log lỗi
            this.message.createMessage('error', 'Cập nhật thông tin thất bại');
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
