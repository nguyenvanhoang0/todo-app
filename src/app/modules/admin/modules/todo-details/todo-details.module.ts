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
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { SearchFieldComponent } from 'src/app/shared/components/searchField/searchField.component';
import { BucketListComponent } from 'src/app/shared/components/bucket-list/bucket-list.component';
import { SelectedTodoListComponent } from './components/selected-todo-list/selected-todo-list.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ConfirmationFormComponent } from 'src/app/shared/components/confirmation-form/confirmation-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TodoDetailsComponent,
    TodoItemComponent,
    TodoItemDetailsComponent,
    SelectedTodoListComponent,
  ],
  imports: [
    CommonModule,
    TodoDetailsRoutingModule,
    NzSkeletonModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    NzPaginationModule,
    NzInputModule,
    NzButtonModule,
    OpenFormComponent,
    OpenModalComponent,
    IconComponent,
    TextComponent,
    EmptyComponent,
    SidebarComponent,
    SearchFieldComponent,
    BucketListComponent,
    ConfirmationFormComponent,
  ],
})
export class TodoDetailsModule {}
