import { Component, OnDestroy, OnInit } from '@angular/core';
import { IQueryParams } from '../../types/query-params.type';
import { IBucket } from './types/todo.type';
import { TodoService } from './services/todo/todo.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private eventSubscription!: Subscription;

  configurationParams: IQueryParams = {
    limit: 10,
    page: 1,
  };

  buckets: IBucket[] = [];

  constructor(
    private todoService: TodoService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllTodo();
  }

  getAllTodo(): void {
    // this.buckets = [];
    this.message.createMessageloading();

    this.subscriptions.add(
      this.todoService
        .getBuckets(this.configurationParams)
        // .pipe(
        //   finalize(() => {
        //   })
        // )
        .subscribe(
          (response) => {
            this.buckets = response.data;
            this.message.createMessage('success', 'loading success');
          },
          (error) => {
            this.message.createMessage('error', error);
            console.error('Error loading buckets', error);
          }
        )
    );
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
