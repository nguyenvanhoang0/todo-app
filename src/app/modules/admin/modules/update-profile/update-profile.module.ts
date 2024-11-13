import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileRoutingModule } from './update-profile-routing.module';
import { UpdateProfileComponent } from './update-profile.component';
import { NzFormPatchModule } from 'ng-zorro-antd/core/form';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UploadImgComponent } from 'src/app/shared/components/upload-img/upload-img.component';

@NgModule({
  declarations: [UpdateProfileComponent],
  imports: [
    CommonModule,
    UpdateProfileRoutingModule,
    NzFormPatchModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    TranslateModule,
    UploadImgComponent
  ]
})
export class UpdateProfileModule { }
