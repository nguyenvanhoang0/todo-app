import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [AdminComponent,ProfileComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzIconModule,
    IconComponent
  ]
})
export class AdminModule { }
