import { Component} from '@angular/core';
import { IUserInfo } from 'src/app/core/store/_auth/_auth.types';
import { Observable } from 'rxjs';
import { selectUserInfo } from 'src/app/core/store/_auth/_auth.selectors';
import { Store } from '@ngrx/store';
import { MainState } from 'src/app/core/store/_store.types';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthApiService } from 'src/app/modules/auth/services/api/auth-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  confirmationForm = false;
  updateForm = false;
  accountView = false;

  userInfo$: Observable<IUserInfo | undefined> =
    this._store.select(selectUserInfo);

  constructor(
    private _store: Store<MainState>,
    private _router: Router,
    private _nzMsgService: NzMessageService,
    private _authApiService: AuthApiService,

  ) {
    this.userInfo$.subscribe();
  }

  openUpdateForm(value: boolean) {
    this.updateForm = value;
  }

  handleAccountView(value: boolean) {
    this.accountView = value;
  }

  handleClickUpdate() {
    this._router.navigate(['admin/update-me']).then();
  }
  

  onConfirm(confirm: boolean) {
    if (confirm === true) {
      this.confirmationForm = false;
      this._authApiService.logout();
    } else {
      this.confirmationForm = false;
    }
  }
}
