import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IQueryParams } from 'src/app/modules/admin/types/query-params.type';
import { IBucket } from '../../types/todo.type';
import { TodoService } from '../../services/todo/todo.service';
import { MessageService } from 'src/app/services/message/message.service';
import { EventService } from 'src/app/modules/admin/services/event/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-content',
  templateUrl: './todo-content.component.html',
  styleUrl: './todo-content.component.scss',
})
export class TodoContentComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private eventSubscription!: Subscription;

  configurationParams: IQueryParams = {
    limit: 99,
    page: 1,
  };

  buckets: IBucket[] = [];

  constructor(
    private _todoService: TodoService,
    private _eventService: EventService,
    private _router: Router,
    public message: MessageService
  ) {}

  ngOnInit(): void {
    this.eventSubscription = this._eventService.event$.subscribe(() =>
      this.getAllTodo()
    );

    this.getAllTodo();
  }

  getAllTodo(): void {
    this.message.createMessageloading(false);

    this.subscriptions.add(
      this._todoService
        .getBuckets(this.configurationParams)
        // .pipe(
        //   finalize(() => {
        //   })
        // )
        .subscribe(
          (response) => {
            this.buckets = response.data;
            this.message.createMessage('success', 'loading success', '', false);
          },
          (error) => {
            this.message.createMessage('error', error);
            console.error('Error loading buckets', error);
          }
        )
    );
  }

  navigateToDetails(id: number) {
    this._router.navigate(['admin/todo-details', id]);
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
