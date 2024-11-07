import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUpdateUserFormGroup } from 'src/app/modules/auth/types/auth.types';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthFormService } from 'src/app/modules/auth/services/form/auth-form.service';
import { AuthApiService } from 'src/app/modules/auth/services/api/auth-api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent {
  updateUserFormGroup!: FormGroup<IUpdateUserFormGroup>;
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _authFormService: AuthFormService,
    private authApiService: AuthApiService,
    private _nzMsgService: NzMessageService
  ) {}

  get updateUserFormControl() {
    return this.updateUserFormGroup.controls;
  }
}
