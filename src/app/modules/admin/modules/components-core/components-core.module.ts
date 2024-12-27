import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsCoreRoutingModule } from './components-core-routing.module';
import { ComponentsCoreComponent } from './components-core.component';
import { ButtonVariantsComponent } from './components/button-variants/button-variants.component';
import { ButtonDirective } from 'src/app/shared/directive/button.directive';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    ComponentsCoreComponent,
    ButtonVariantsComponent,
    ButtonDirective,
  ],
  imports: [
    CommonModule,
    ComponentsCoreRoutingModule,
    NzButtonModule,
    InputFieldComponent,
  ],
})
export class ComponentsCoreModule {}
