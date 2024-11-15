import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoDetailsRoutingModule } from './todo-details-routing.module';
import { TodoDetailsComponent } from './todo-details.component';
import { OpenFormComponent } from 'src/app/shared/components/open-form/open-form.component';


@NgModule({
  declarations: [TodoDetailsComponent],
  imports: [
    CommonModule,
    TodoDetailsRoutingModule,
    OpenFormComponent
  ]
})
export class TodoDetailsModule { }
