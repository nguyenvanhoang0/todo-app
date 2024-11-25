import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUpdateUserFormGroup } from './types/update-user.type';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UpdateUserFormService } from './services/form/update-user-form.service';
import { UserService } from './services/user/user.service';
import { MessageService } from 'src/app/services/message/message.service';
import { IUserInfo } from 'src/app/core/store/_auth/_auth.types';
import { selectUserInfo } from 'src/app/core/store/_auth/_auth.selectors';
import { MainState } from 'src/app/core/store/_store.types';
import { Store } from '@ngrx/store';
import { EventService } from '../../services/event/event.service';
import { AuthApiService } from 'src/app/modules/auth/services/api/auth-api.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
})
export class UpdateProfileComponent implements OnDestroy, OnInit {
  avatar:  string | ArrayBuffer | null = null;

  updateUserFormGroup: FormGroup<IUpdateUserFormGroup> =
    this._updateUserService.UpdateUserGroup;

  private _unsubscribe$ = new Subject<void>();
  private subscriptions: Subscription = new Subscription();

  userInfo$: Observable<IUserInfo | undefined> =
    this._store.select(selectUserInfo);

  constructor(
    private _store: Store<MainState>,
    private _router: Router,
    private _eventService: EventService,
    private _updateUserService: UpdateUserFormService,
    private _userService: UserService,
    private _authApiService: AuthApiService,

    public message: MessageService
  ) {}

  get registerFormControl() {
    return this.updateUserFormGroup.controls;
  }

  ngOnInit(): void {
    this.getAvatar();
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
  }

  getAvatar(): void {
    this.subscriptions.add(
      this._authApiService.getAvatar().subscribe({
        next: (response: string) => {
          this.avatar = response;           
        },
        error: (error) => {
          this.message.createMessage('error', 'Failed to load avatar');
          console.error('Error loading avatar:', error);
        }
      })
    );
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
      const { email, username, avatar } = this.updateUserFormGroup.getRawValue();
      const formData = new FormData();
      formData.append('email', email as string);
      formData.append('username', username as string);
      if (avatar) {
        formData.append('avatar', avatar);
      }   
      this.message.createMessageloading();
      this._userService
        .updateUser(formData)
        .subscribe({
          next: (response) => {
            this._eventService.emitEvent("updateUser");
            this.message.createMessage('success', response);
          },
          error: (err) => {
            this.message.createMessage('error', err);
            console.error('Update error:', err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this.message.destroy();
  }
}
