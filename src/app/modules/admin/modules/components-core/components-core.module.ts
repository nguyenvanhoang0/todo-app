import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsCoreRoutingModule } from './components-core-routing.module';
import { ComponentsCoreComponent } from './components-core.component';
import { ButtonVariantsComponent } from './components/button-variants/button-variants.component';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomButtonComponent } from 'src/app/shared/components/custom-button/custom-button.component';

@NgModule({
  declarations: [ComponentsCoreComponent, ButtonVariantsComponent],
  imports: [
    CommonModule,
    ComponentsCoreRoutingModule,
    NzButtonModule,
    SharedModule,
    InputFieldComponent,
    CustomButtonComponent,
  ],
})
export class ComponentsCoreModule {}
