import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ConfirmationFormComponent } from 'src/app/shared/components/confirmation-form/confirmation-form.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { OpenModalComponent } from 'src/app/shared/components/open-modal/open-modal.component';
import { AccountComponent } from 'src/app/shared/components/account/account.component';
import { UploadImgComponent } from 'src/app/shared/components/upload-img/upload-img.component';



@NgModule({
  declarations: [AdminComponent,ProfileComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzIconModule,
    NzAvatarModule,
    IconComponent,
    ConfirmationFormComponent,
    OpenModalComponent,
    AccountComponent,
    UploadImgComponent,
  ]
})
export class AdminModule { }
