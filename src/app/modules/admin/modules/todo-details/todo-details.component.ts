import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoDetailsService } from './services/todo/todo-details.service';
import { Subscription } from 'rxjs';
import { IBucket } from '../todo/types/todo.type';
import { EventService } from '../../services/event/event.service';
import { TodoItemService } from './services/todo-item/todo-item.service';
import { IBucketItem } from './types/todo-item.type';
import { IQueryParams } from '../../types/query-params.type';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  todoId = 1;

  private subscriptions: Subscription = new Subscription();
  private eventSubscription!: Subscription;

  bucket!: IBucket;
  bucketItem!: IBucketItem[];
  totalBuckets = 0;

  doneItems: IBucketItem[] = [];
  notDoneItems: IBucketItem[] = [];
  configurationParams: IQueryParams = {
    limit: 99,
    page: 1,
  };

  constructor(
    private _route: ActivatedRoute,
    private _eventService: EventService,
    private _todoItemsService: TodoItemService,
    private _todoDetailsService: TodoDetailsService,
    public message: MessageService
  ) {}

  ngOnInit(): void {
    this.eventSubscription = this._eventService.event$.subscribe(() =>
      this.getTodo()
    );

    this._route.paramMap.subscribe((params) => {
      this.todoId = Number(params.get('id'));
      this.getTodo();
    });
  }

  getTodo() {
    if (this.todoId) {
      this.getBucketDetails(this.todoId);
      this.getBucketItems();
    }
  }

  getBucketDetails(id: number): void {
    this.subscriptions.add(
      this._todoDetailsService.getBucketById(id).subscribe(
        (response) => {
          this.bucket = response.data;
        },
        (error) => {
          console.error('Error Fetching Bucket Details:', error);
        }
      )
    );
  }

  getBucketItems(): void {
    this.message.createMessageloading(false);
    this.subscriptions.add(
      this._todoItemsService
        .getBucketItems(this.todoId, this.configurationParams)
        // .pipe(
        //   finalize(() => {
        //   })
        // )
        .subscribe(
          (response) => {
            this.totalBuckets = response.total;
            this.bucketItem = response.data;
            this.filterBucketItems(response.data);
            this.message.createMessage('success', 'loading success', '', false);
          },
          (error) => {
            this.message.createMessage('error', error);
            console.error('Error Fetching Bucket Items:', error);
          }
        )
    );
  }

  filterBucketItems(bucketItem: IBucketItem[]) {
    this.doneItems = bucketItem.filter((item) => item.done === true);
    this.notDoneItems = bucketItem.filter((item) => item.done === false);
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
    this.message.destroy()
  }
}
