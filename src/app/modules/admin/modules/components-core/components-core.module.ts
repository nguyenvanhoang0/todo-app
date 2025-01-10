import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsCoreRoutingModule } from './components-core-routing.module';
import { ComponentsCoreComponent } from './components-core.component';
import { ButtonVariantsComponent } from './components/button-variants/button-variants.component';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomButtonComponent } from 'src/app/shared/components/custom-button/custom-button.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { InputComponent } from './components/input/input.component';
import { CustomInputV2Component } from 'src/app/shared/components/custom-input-v2/custom-input-v2.component';
import { CountDownViewComponent } from './components/count-down-view/count-down-view.component';
import { CountDownComponent } from 'src/app/shared/components/count-down/count-down.component';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';
import { CalendarComponent } from 'src/app/shared/components/calendar/calendar.component';
import { SelectViewComponent } from './components/select-view/select-view.component';
import { CustomSelectComponent } from 'src/app/shared/components/custom-select/custom-select.component';

@NgModule({
  declarations: [
    ComponentsCoreComponent,
    InputComponent,
    ButtonVariantsComponent,
    CountDownViewComponent,
    CalendarViewComponent,
    SelectViewComponent,
  ],
  imports: [
    CommonModule,
    ComponentsCoreRoutingModule,
    FormsModule,
    NzButtonModule,
    SharedModule,
    NzSelectModule,
    NzInputModule,
    InputFieldComponent,
    CustomButtonComponent,
    CustomInputV2Component,
    CountDownComponent,
    CalendarComponent,
    CustomSelectComponent,
  ],
})
export class ComponentsCoreModule {}
