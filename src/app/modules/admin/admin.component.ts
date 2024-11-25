import { Component } from '@angular/core';
import { ModalService } from 'src/app/shared/components/open-modal/services/modal/modal.service';
import { AuthApiService } from '../auth/services/api/auth-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  confirmationForm = false;

  constructor(
    private modalService: ModalService,
    private authApiService: AuthApiService
  ) {}

  onConfirm(confirm: boolean) {
    if (confirm === true) {
      this.confirmationForm = false;
      console.log(123);
      this.modalService.hide('Unauthorized');
      this.authApiService.logout();
    } else {
      this.confirmationForm = false;
    }
  }
}
