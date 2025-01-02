import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesRoutingModule } from './directives-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { DirectivesComponent } from './directives.component';
import { ButtonDirectiveComponent } from './componnents/button-directive/button-directive.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomButtonComponent } from 'src/app/shared/components/custom-button/custom-button.component';

@NgModule({
  declarations: [DirectivesComponent, ButtonDirectiveComponent],
  imports: [
    CommonModule,
    DirectivesRoutingModule,
    NzButtonModule,
    SharedModule,
    InputFieldComponent,
    CustomButtonComponent,
  ],
})
export class DirectivesModule {}
