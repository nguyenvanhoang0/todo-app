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
import { IBucketItem, IExtendBucketItem } from '../../types/todo-item.type';
import { IQueryParams } from 'src/app/modules/admin/types/query-params.type';
import { EventService } from 'src/app/modules/admin/services/event/event.service';
import { MessageService } from 'src/app/services/message/message.service';
import { TodoItemService } from '../../services/todo-item/todo-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationParamsService } from 'src/app/modules/admin/services/configuration-params/configuration-params.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { SelectService } from 'src/app/modules/admin/services/select/select.service';

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
  @Input() selectionMode = false;
  selectedBucketItemList?: IBucketItem[];

  @Output() totalBucketItem = new EventEmitter<number>();

  extendBucketItem: IExtendBucketItem[] = [];
  selectBucketItem?: IBucketItem;
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
    private _dateTimeService: DateTimeService,
    private _selectService: SelectService,

    public message: MessageService
  ) {}

  ngOnInit(): void {
    if (this.done !== undefined) {
      this.configurationParams.done = this.done;
    }
    this.listenToBucketitemChanges();
    this.listenToParamsChanges();
    this.listenToBucketitemSelectedChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todoId'] && !changes['todoId'].firstChange) {
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

  listenToBucketitemSelectedChanges() {
    this.subscriptions.add(
      this._selectService.bucketItem$.subscribe((items) => {
        this.selectedBucketItemList = items;
        this.updateSelectedItems();
      })
    );
  }

  getBucketItems(id: number, params: IQueryParams): void {
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
          } else {
            this.totalBucketItems = response.total;
            this.extendBucketItem = response.data.map((item) =>
              this.transformBucketItem(item)
            );
            this.updateSelectedItems();
            this.totalBucketItem.emit(response.total);
            this.message.createMessage('success', 'loading success', '', false);
          }
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

  transformBucketItem(bucketItem: IBucketItem): IExtendBucketItem {
    return {
      ...bucketItem,
      status: this._dateTimeService.checkDeadlineStatus(bucketItem.deadline),
    };
  }

  handleClickItemDetails(selectBucketItem: IBucketItem) {
    if (this.selectionMode) {
      this._selectService.toggleBucketItem(selectBucketItem);
    } else {
      this.openItemDetailsView(true, selectBucketItem);
    }
  }

  updateSelectedItems(): void {
    this.extendBucketItem.forEach((item) => {
      const isSelected = this.selectedBucketItemList?.some(
        (selectedItem) => selectedItem.id === item.id
      );
      item.selected = isSelected;
    });
  }

  handleItemDetailsView(value: boolean) {
    this.itemDetailsView = value;
  }

  openItemDetailsView(value: boolean, selectBucketItem: IBucketItem) {
    this.itemDetailsView = value;
    this.selectBucketItem = selectBucketItem;
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
