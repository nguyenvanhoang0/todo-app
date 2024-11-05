import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ConfirmationFormComponent } from 'src/app/shared/components/confirmation-form/confirmation-form.component';



@NgModule({
  declarations: [AdminComponent,ProfileComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzIconModule,
    IconComponent,
    ConfirmationFormComponent
  ]
})
export class AdminModule { }
