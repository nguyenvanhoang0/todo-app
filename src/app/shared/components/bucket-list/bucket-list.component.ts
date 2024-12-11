import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/modules/admin/modules/todo/services/todo/todo.service';
import { EventService } from 'src/app/modules/admin/services/event/event.service';
import { ConfigurationParamsService } from 'src/app/modules/admin/services/configuration-params/configuration-params.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';
import { Subscription } from 'rxjs';
import { IQueryParams } from 'src/app/modules/admin/types/query-params.type';
import { IBucket } from 'src/app/modules/admin/modules/todo/types/todo.type';
import { IconComponent } from '../icon/icon.component';
import { EmptyComponent } from '../empty/empty.component';
import { TextComponent } from '../text/text.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-bucket-list',
  standalone: true,
  imports: [
    CommonModule,
    NzSkeletonModule,
    NzPaginationModule,
    IconComponent,
    EmptyComponent,
    TextComponent,
  ],
  templateUrl: './bucket-list.component.html',
  styleUrl: './bucket-list.component.scss',
})
export class BucketListComponent implements OnDestroy, OnChanges, OnInit {
  @Input() searchContent?: string;

  private subscriptions: Subscription = new Subscription();
  private eventSubscription!: Subscription;

  configurationParams: IQueryParams = {
    limit: 12,
    page: 1,
  };
  searchParam?: string;
  buckets: IBucket[] = [];
  totalBuckets = 0;
  todoId!: number;

  constructor(
    private _todoService: TodoService,
    private _eventService: EventService,
    private _configService: ConfigurationParamsService,
    private _route: ActivatedRoute,
    private _router: Router,

    public message: MessageService
  ) {}

  ngOnInit(): void {
    this.eventSubscription = this._eventService.event$.subscribe((event) => {
      if (event.id === 'edit bucket' || event.id === 'deleteBucket') {
        this.search(this.searchContent);
      }
    });
    this.getIDBucket();
    this.listenToParamsChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchContent']) {
      this.search(changes['searchContent'].currentValue);
    }
  }

  listenToParamsChanges(): void {
    this._route.queryParamMap.subscribe((params) => {
      const searchParam = params.get('search')
        ? params.get('search')
        : undefined;
      this.searchParam = searchParam ? searchParam : undefined;
    });
  }

  onPageChange(page: number): void {
    this.configurationParams.page = page;
    this.getAllTodo(this.configurationParams);
  }

  getAllTodo(params: IQueryParams): void {
    this.message.createMessageloading(false);
    this.subscriptions.add(
      this._todoService.getBuckets(params).subscribe(
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

  getIDBucket() {
    this._route.paramMap.subscribe((params) => {
      this.todoId = Number(params.get('id'));
    });
  }

  search(query?: string | null): void {
    if (query && query.length > 1) {
      this.configurationParams.query = query;
      this.configurationParams.page = 1;
      this.getAllTodo(this.configurationParams);
    } else {
      this.getAllTodo(this._configService.getDefaultParamsConfiguration());
    }
  }

  navigateToDetails(id: number) {
    const currentParams = { ...this._route.snapshot.queryParams };
    this._router.navigate([`admin/todo-details/${id}`], {
      queryParams: { ...currentParams, search: this.searchParam },
    });
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
    this.subscriptions.unsubscribe();
    this.message.destroy();
  }
}
