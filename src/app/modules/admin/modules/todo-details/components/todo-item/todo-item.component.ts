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
import { Subject, Subscription } from 'rxjs';
import { IBucketItem } from '../../types/todo-item.type';
import { IQueryParams } from 'src/app/modules/admin/types/query-params.type';
import { EventService } from 'src/app/modules/admin/services/event/event.service';
import { MessageService } from 'src/app/services/message/message.service';
import { TodoItemService } from '../../services/todo-item/todo-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationParamsService } from 'src/app/modules/admin/services/configuration-params/configuration-params.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent implements OnDestroy, OnInit, OnChanges {
  private eventSubscription!: Subscription;
  private routeSubscription: Subscription | undefined;

  private subscriptions: Subscription = new Subscription();
  private destroy$ = new Subject<void>();

  @Input() done: 0 | 1 | undefined;
  @Input() todoId!: number;
  @Output() totalBucket = new EventEmitter<number>();

  bucketItem: IBucketItem[] = [];
  bucketSelectItem?: IBucketItem;
  totalBucketItems = 0;
  searchContent = '';

  itemDetailsView = false;
  firstFoad = true;
  configurationParams: IQueryParams = {
    limit: 8,
    page: 1,
  };

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _eventService: EventService,
    private _todoItemsService: TodoItemService,
    private _configService: ConfigurationParamsService,
    public message: MessageService
  ) {}

  ngOnInit(): void {
    if (this.done !== undefined) {
      this.configurationParams.done = this.done;
    }
    this.listenToBucketitemChanges();
    this.listenToParamsChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['todoId'].firstChange && changes['todoId']) {
      this.search(this.configurationParams.query);
    }
  }

  listenToParamsChanges(): void {
    this.routeSubscription = this._route.queryParamMap.subscribe((params) => {
      const pageParam = params.get(this.done ? 'pageDone' : 'page');
      const searchParam = params.get('search');
      const newPage = pageParam ? +pageParam : 1;
      const PageChanges =
        (pageParam ? +pageParam : 1) !== this.configurationParams.page;

      const searchChanges =
        (this.searchContent.length > 1 ? this.searchContent : undefined) !==
        (searchParam
          ? searchParam.length > 1
            ? searchParam
            : undefined
          : undefined);

      if (PageChanges || searchChanges || this.firstFoad) {
        this.configurationParams.page = newPage;
        if (pageParam || searchChanges || this.firstFoad) {
          this.searchContent = searchParam || '';
          this.firstFoad = false;
          this.search(searchParam || undefined);
        }
      }
    });
  }

  listenToBucketitemChanges() {
    this.eventSubscription = this._eventService.event$.subscribe((event) => {
      if (
        event.id === 'add bucket items' ||
        event.id === 'edit bucket items' ||
        event.id === 'deleteBucketItem'
      ) {
        this.search(this.configurationParams.query);
      }
    });
  }

  getBucketItems(id: number, params: IQueryParams): void {
    console.log('load');

    this.handleItemDetailsView(false);
    this.message.createMessageloading(false);
    this.subscriptions.add(
      this._todoItemsService.getBucketItems(id, params).subscribe({
        next: (response) => {
          const page = Math.ceil(
            response.total / this.configurationParams.limit
          );
          if (
            response.data.length === 0 &&
            response.total > 0 &&
            this.configurationParams.page > page
          ) {
            this.onPageChange(page);
          }
          this.totalBucketItems = response.total;
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
    this.configurationParams.query = query;
    if (query && query.length > 1) {
      this.getBucketItems(this.todoId, this.configurationParams);
    } else {
      this.getBucketItems(
        this.todoId,
        this._configService.getDefaultParamsConfiguration(
          this.configurationParams.page,
          this.done,
          8
        )
      );
    }
  }

  onPageChange(page: number): void {
    const currentParams = { ...this._route.snapshot.queryParams };
    const queryParams = this.done
      ? { ...currentParams, pageDone: page }
      : { ...currentParams, page };
    this._router.navigate([`admin/todo-details/${this.todoId}`], {
      queryParams,
    });
  }

  checkDeadlineStatus(deadline?: string): string {
    const now = new Date();

    if (deadline) {
      const timeDeadline = new Date(deadline);
      const diffInMilliseconds = timeDeadline.getTime() - now.getTime();

      if (diffInMilliseconds > 6 * 60 * 60 * 1000) {
        return 'normal';
      } else if (
        diffInMilliseconds > 0 &&
        diffInMilliseconds <= 6 * 60 * 60 * 1000
      ) {
        return 'warning';
      } else {
        return 'late';
      }
    } else {
      return 'normal';
    }
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
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    this.subscriptions.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
