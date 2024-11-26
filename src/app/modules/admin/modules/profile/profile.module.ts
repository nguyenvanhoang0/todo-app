import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { OpenModalComponent } from 'src/app/shared/components/open-modal/open-modal.component';
import { ConfirmationFormComponent } from 'src/app/shared/components/confirmation-form/confirmation-form.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NzAvatarModule,
    TranslateModule,
    IconComponent,
    OpenModalComponent,
    ConfirmationFormComponent
  ]
})
export class ProfileModule { }
