import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IUserInfo } from 'src/app/core/store/_auth/_auth.types';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  @Input() userInfo?: IUserInfo;
  @Output() Visible = new EventEmitter<boolean>();

  confirmationForm = false;

  constructor(
    private _router: Router,
    private message: MessageService
  ) {}

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
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
    this.message.createMessage('success','sign out success');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    this._router.navigate(['/auth/signIn']);
  }
}
