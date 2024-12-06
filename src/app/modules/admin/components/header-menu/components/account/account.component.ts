import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IUserInfo } from 'src/app/core/store/_auth/_auth.types';
import { AuthApiService } from 'src/app/modules/auth/services/api/auth-api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  @Input() userInfo?: IUserInfo;
  @Input() avatar? = '';
  @Output() Visible = new EventEmitter<boolean>();

  confirmationForm = false;

  constructor(
    private _router: Router,
    private authApiService: AuthApiService
  ) {}

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  handleClickUpdate() {
    this._router.navigate(['admin/update-me']).then();
    this.Visible.emit(false);
  }

  handleClickSignIn() {
    this._router.navigate(['/auth/signIn']);
  }

  onConfirm(confirm: boolean) {
    if (confirm === true) {
      this.confirmationForm = false;
      this.authApiService.logout();
    } else {
      this.confirmationForm = false;
    }
  }
}
