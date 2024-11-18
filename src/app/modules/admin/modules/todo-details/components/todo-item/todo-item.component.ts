import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { EventService } from 'src/app/modules/admin/services/event/event.service';
import { IBucketItem } from '../../types/todo-item.type';
import { TodoItemService } from '../../services/todo-item/todo-item.service';
import { IQueryParams } from 'src/app/modules/admin/types/query-params.type';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent implements OnDestroy, OnInit {
  todoItemId = 1;

  private subscriptions: Subscription = new Subscription();
  private eventSubscription!: Subscription;

  bucketItem!: IBucketItem[];
  totalBuckets = 0;

  configurationParams: IQueryParams = {
    limit: 99,
    page: 1,
  };

  constructor(
    private _route: ActivatedRoute,
    private _eventService: EventService,
    private _todoItemsService: TodoItemService,
    public message: MessageService
  ) {}

  ngOnInit(): void {
    if(this.todoItemId){
      this.eventSubscription = this._eventService.event$.subscribe(() => this.getBucketItems());

    }

    this._route.paramMap.subscribe((params) => {
      this.todoItemId = Number(params.get('id'));
      this.getBucketItems()
    });
  }

  onPageChange(page: number): void {
    this.configurationParams.page = page;
    this.getBucketItems();
  }

  getBucketItems(): void {
    this.subscriptions.add(
      this._todoItemsService
        .getBucketItems(this.todoItemId, this.configurationParams)
        .pipe(
          finalize(() => {
            this.message.createMessageloading(false);
          })
        )
        .subscribe(
          (response) => {
            this.totalBuckets = response.total;
            this.bucketItem = response.data;
            this.message.createMessage('success', 'loading success', '', false);

          },
          (error) => {
            this.message.createMessage('error', error);
            console.error('Error Fetching Bucket Items:', error);
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
