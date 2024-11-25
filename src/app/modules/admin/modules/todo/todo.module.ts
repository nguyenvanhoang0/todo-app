import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { EmptyComponent } from 'src/app/shared/components/empty/empty.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TodoContentComponent } from './components/todo-content/todo-content.component';
import { OpenFormComponent } from 'src/app/shared/components/open-form/open-form.component';
import { TextComponent } from 'src/app/shared/components/text/text.component';
import { ItemContentComponent } from './components/item-content/item-content.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchFieldComponent } from 'src/app/shared/components/searchField/searchField.component';

@NgModule({
  declarations: [TodoComponent, TodoContentComponent, ItemContentComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    NzSkeletonModule,
    NzPaginationModule,
    ReactiveFormsModule,
    SharedModule,
    NzInputModule,
    IconComponent,
    EmptyComponent,
    OpenFormComponent,
    TextComponent,
    SearchFieldComponent,
  ],
})
export class TodoModule {}
