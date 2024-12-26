import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsCoreRoutingModule } from './components-core-routing.module';
import { ComponentsCoreComponent } from './components-core.component';
import { ButtonVariantsComponent } from './components/button-variants/button-variants.component';
import { ButtonDirective } from 'src/app/shared/directive/button.directive';

@NgModule({
  declarations: [
    ComponentsCoreComponent,
    ButtonVariantsComponent,
    ButtonDirective,
  ],
  imports: [CommonModule, ComponentsCoreRoutingModule],
})
export class ComponentsCoreModule {}
