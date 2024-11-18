import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
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
    limit: 12,
    page: 1,
  };

  buckets: IBucket[] = [];
  totalBuckets = 0;

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

  onPageChange(page: number): void {
    this.configurationParams.page = page;
    this.getAllTodo();
  }

  getAllTodo(): void {
    this.subscriptions.add(
      this._todoService
        .getBuckets(this.configurationParams)
        .pipe(
          finalize(() => {
            this.message.createMessageloading(false);
          })
        )
        .subscribe(
          (response) => {
            this.buckets = response.data;
            this.totalBuckets = response.total;
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
