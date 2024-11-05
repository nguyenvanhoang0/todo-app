import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { ConfirmationFormComponent } from './components/confirmation-form/confirmation-form.component';
import { OpenModalComponent } from './components/open-modal/open-modal.component';
import { UploadImgComponent } from './components/upload-img/upload-img.component';

const COMPONENTS = [
  IconComponent,
  ConfirmationFormComponent,
  OpenModalComponent,
  UploadImgComponent
]

@NgModule({
  declarations: [],
  imports: [
    COMPONENTS
  ]
})
export class SharedModule { }
