import { Component, Input } from '@angular/core';
import { IBucketItem } from '../../types/todo-item.type';

@Component({
  selector: 'app-todo-item-details',
  templateUrl: './todo-item-details.component.html',
  styleUrl: './todo-item-details.component.scss',
})
export class TodoItemDetailsComponent {
  @Input() bucketItem?: IBucketItem;
  
}
