import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoDetailsRoutingModule } from './todo-details-routing.module';
import { TodoDetailsComponent } from './todo-details.component';
import { OpenFormComponent } from 'src/app/shared/components/open-form/open-form.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { TextComponent } from 'src/app/shared/components/text/text.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { EmptyComponent } from 'src/app/shared/components/empty/empty.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { TodoItemDetailsComponent } from './components/todo-item-details/todo-item-details.component';
import { OpenModalComponent } from 'src/app/shared/components/open-modal/open-modal.component';

@NgModule({
  declarations: [TodoDetailsComponent, TodoItemComponent,TodoItemDetailsComponent],
  imports: [
    CommonModule,
    TodoDetailsRoutingModule,
    NzSkeletonModule,
    SharedModule,
    NzPaginationModule,
    OpenFormComponent,
    OpenModalComponent,
    IconComponent,
    TextComponent,
    EmptyComponent,
  ],
})
export class TodoDetailsModule {}
