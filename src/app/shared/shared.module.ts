import { NgModule } from '@angular/core';
import { IconComponent } from './components/icon/icon.component';
import { ConfirmationFormComponent } from './components/confirmation-form/confirmation-form.component';
import { OpenModalComponent } from './components/open-modal/open-modal.component';
import { UploadImgComponent } from './components/upload-img/upload-img.component';
import { ChangeLanguageComponent } from './components/change-language/change-language.component';
import { EmptyComponent } from './components/empty/empty.component';

const COMPONENTS = [
  IconComponent,
  ConfirmationFormComponent,
  OpenModalComponent,
  UploadImgComponent,
  ChangeLanguageComponent,
  EmptyComponent
]

@NgModule({
  declarations: [],
  imports: [
    COMPONENTS
  ]
})
export class SharedModule { }
