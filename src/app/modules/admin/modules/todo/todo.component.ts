import { Component, OnDestroy } from '@angular/core';
import { IBucket } from './types/todo.type';
import { TodoService } from './services/todo/todo.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnDestroy {
  private eventSubscription!: Subscription;


  buckets: IBucket[] = [];

  constructor(
    private _todoService: TodoService,
    public message: MessageService
  ) {}


  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
