import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUserInfo } from 'src/app/core/store/_auth/_auth.types';
import { Observable } from 'rxjs';
import { selectUserInfo } from 'src/app/core/store/_auth/_auth.selectors';
import { Store } from '@ngrx/store';
import { MainState } from 'src/app/core/store/_store.types';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  confirmationForm: boolean = false;
  updateForm: boolean = false;
  accountView: boolean = false;

  userInfo$: Observable<IUserInfo | undefined> =
    this._store.select(selectUserInfo);

  constructor(
    private _store: Store<MainState>,
    private _router: Router,
    private _nzMsgService: NzMessageService
  ) {
    this.userInfo$.subscribe();
  }

  openConfirmationForm() {
    this.confirmationForm = true;
  }

  openUpdateForm(value: boolean) {    
    this.updateForm = value;
  }

  handleAccountView(value: boolean) {
    this.accountView = value;
  }

  onConfirm(confirm: boolean) {
    if (confirm === true) {
      this.confirmationForm = false;
      this.logout();
    } else {
      this.confirmationForm = false;
    }
  }

  logout() {
    this._nzMsgService.success('sign out success');

    localStorage.removeItem('accessToken'),
      localStorage.removeItem('userInfo'),
      this._router.navigate(['/auth/signIn']);
  }
}
