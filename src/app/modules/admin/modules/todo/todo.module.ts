import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { EmptyComponent } from 'src/app/shared/components/empty/empty.component';


@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    IconComponent,
    EmptyComponent,
  ]
})
export class TodoModule { }
