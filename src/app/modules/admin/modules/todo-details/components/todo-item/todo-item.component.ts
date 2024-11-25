import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IBucketItem } from '../../types/todo-item.type';
import { IQueryParams } from 'src/app/modules/admin/types/query-params.type';
import { EventService } from 'src/app/modules/admin/services/event/event.service';
import { MessageService } from 'src/app/services/message/message.service';
import { TodoItemService } from '../../services/todo-item/todo-item.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationParamsService } from 'src/app/modules/admin/services/configuration-params/configuration-params.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent implements OnDestroy, OnInit, OnChanges {
  @Input() done: 0 | 1 = 0;
  @Input() searchContent?: string;
  @Output() totalBucket = new EventEmitter<number>();
  // @Output() page = new EventEmitter<number>();

  bucketItem: IBucketItem[] = [];
  totalBuckets = 0;
  todoItemId = 0;

  configurationParams: IQueryParams = {
    limit: 12,
    page: 1,
  };

  private eventSubscription!: Subscription;
  private subscriptions: Subscription = new Subscription();
  todoId!: number;

  itemDetailsView = false;
  bucketSelectItem?: IBucketItem;

  constructor(
    private _route: ActivatedRoute,
    private _eventService: EventService,
    private _todoItemsService: TodoItemService,
    private _configService: ConfigurationParamsService,
    public message: MessageService
  ) {}

  ngOnInit(): void {
    this.eventSubscription = this._eventService.event$.subscribe((event) => {
      if (event.id === undefined) {
        this.search(this.searchContent);
      }
    });
    this.configurationParams.done = this.done;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._route.paramMap.subscribe((params) => {
      this.todoId = Number(params.get('id'));
      if (changes['searchContent']) {
        this.search(changes['searchContent'].currentValue);
      }
    });
  }

  getBucketItems(id: number, params: IQueryParams): void {
    this.handleItemDetailsView(false);
    this.message.createMessageloading(false);
    this.bucketItem = [];
    this.subscriptions.add(
      this._todoItemsService.getBucketItems(id, params).subscribe({
        next: (response) => {
          if (
            response.data.length === 0 &&
            response.total > 0 &&
            this.configurationParams.page > 1
          ) {
            this.configurationParams.page = this.configurationParams.page - 1;
            this.search(this.searchContent);
          }
          this.totalBuckets = response.total;
          this.bucketItem = response.data;
          this.totalBucket.emit(response.total);
          this.message.createMessage('success', 'loading success', '', false);
        },
        error: (err) => {
          this.message.createMessage('error', err);
          console.error('Error Fetching Bucket Items:', err);
        },
      })
    );
  }

  search(query?: string | null): void {
    if (query && query.length > 1) {
      this.configurationParams.query = query;
      this.getBucketItems(this.todoId, this.configurationParams);
    } else {
      this.getBucketItems(
        this.todoId,
        this._configService.getDefaultParamsConfiguration(
          this.done,
          12,
          this.configurationParams.page
        )
      );
    }
  }

  onPageChange(page: number): void {
    this.configurationParams.page = page;
    this.search(this.searchContent);
  }

  handleItemDetailsView(value: boolean) {
    this.itemDetailsView = value;
  }

  openItemDetailsView(value: boolean, bucketSelectItem: IBucketItem) {
    this.itemDetailsView = value;
    this.bucketSelectItem = bucketSelectItem;
  }

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
