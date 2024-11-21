import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoDetailsService } from './services/todo/todo-details.service';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { IBucket } from '../todo/types/todo.type';
import { EventService } from '../../services/event/event.service';
import { TodoItemService } from './services/todo-item/todo-item.service';
import { IBucketItem } from './types/todo-item.type';
import { IQueryParams } from '../../types/query-params.type';
import { MessageService } from 'src/app/services/message/message.service';
import { FormControl } from '@angular/forms';
import { ConfigurationParamsService } from '../../services/configuration-params/configuration-params.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private eventSubscription!: Subscription;
  searchControl = new FormControl('', { updateOn: 'change' });
  todoId!: number;

  bucket?: IBucket;
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
    private _configService: ConfigurationParamsService,
    public message: MessageService
  ) {}

  ngOnInit(): void {
    this.eventSubscription = this._eventService.event$.subscribe(() =>
      this.getTodo(this.todoId)
    );
    this.getIDBucket();
    this.searchWithDebounce();
  }

  getIDBucket() {
    this._route.paramMap.subscribe((params) => {
      this.todoId = Number(params.get('id'));
      this.getTodo(this.todoId);
    });
  }

  getTodo(id: number) {
    this.getBucketDetails(id);
    this.getBucketItems(id,  this.configurationParams);
  }

  getBucketDetails(id: number): void {
    this.subscriptions.add(
      this._todoDetailsService.getBucketById(id).subscribe({
        next: (response) => {
          this.bucket = response.data;
        },
        error: (err) => {
          console.error('Error Fetching Bucket Details:', err);
        },
      })
    );
  }

  getBucketItems(id: number , params : IQueryParams): void {
    this.message.createMessageloading(false);
    this.subscriptions.add(
      this._todoItemsService
        .getBucketItems(id,params)
        // .pipe(
        //   finalize(() => {
        //   })
        // )
        .subscribe({
          next: (response) => {
            this.totalBuckets = response.total;
            this.bucketItem = response.data;
            this.filterBucketItems(response.data);
            this.message.createMessage('success', 'loading success', '', false);
          },
          error: (err) => {
            this.message.createMessage('error', err);
            console.error('Error Fetching Bucket Items:', err);
          },
        })
    );
  }

  searchWithDebounce(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.search(value)
      });
  }

  search(query: string | null): void {
    if (query && query.length > 1) {
      this.configurationParams.query = query;
      this.configurationParams.page = 1;
      this.getBucketItems(this.todoId ,this.configurationParams);
    }else{      
      console.log(1);
      
      this.getBucketItems(this.todoId, this._configService.getDefaultParamsConfiguration());      
    }
  }

  filterBucketItems(bucketItem: IBucketItem[]) {
    this.doneItems = bucketItem.filter((item) => item.done === true);
    this.notDoneItems = bucketItem.filter((item) => item.done === false);
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
    this.subscriptions.unsubscribe();
    this.message.destroy();
  }
}
