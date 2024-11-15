import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { EmptyComponent } from 'src/app/shared/components/empty/empty.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TodoContentComponent } from './components/todo-content/todo-content.component';
import { OpenFormComponent } from 'src/app/shared/components/open-form/open-form.component';


@NgModule({
  declarations: [TodoComponent,TodoContentComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    NzSkeletonModule,
    IconComponent,
    EmptyComponent,
    OpenFormComponent
  ]
})
export class TodoModule { }
