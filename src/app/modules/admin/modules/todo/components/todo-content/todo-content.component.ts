import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IQueryParams } from 'src/app/modules/admin/types/query-params.type';
import { IBucket } from '../../types/todo.type';
import { TodoService } from '../../services/todo/todo.service';
import { MessageService } from 'src/app/services/message/message.service';
import { EventService } from 'src/app/modules/admin/services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationParamsService } from 'src/app/modules/admin/services/configuration-params/configuration-params.service';

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
    private _configService: ConfigurationParamsService,
    private _router: Router,
    private _route: ActivatedRoute,

    public message: MessageService
  ) {}

  ngOnInit(): void {
    this.listenToParamsChanges();
    this.listenToBucketChanges();
  }

  listenToParamsChanges() {
    this._route.queryParamMap.subscribe((params) => {
      const pageParam = params.get('page');
      const searchParam = params.get('search');
      this.search(
        pageParam ? +pageParam : 1,
        searchParam ? searchParam : undefined
      );
    });
  }

  listenToBucketChanges() {
    this.eventSubscription = this._eventService.event$.subscribe((event) => {
      if (
        event.id === 'edit bucket' ||
        event.id === 'add bucket' ||
        event.id === 'deleteBucket'
      ) {
        this.search(this.configurationParams.page,this.configurationParams.query);
      }
    });
  }

  onPageChange(page: number): void {
    const currentParams = { ...this._route.snapshot.queryParams };
    this._router.navigate(['admin/todo'], {
      queryParams: { ...currentParams, page },
    });
  }

  getAllTodo(params: IQueryParams): void {
    this.buckets = [];
    this.message.createMessageloading(false);
    this.subscriptions.add(
      this._todoService.getBuckets(params).subscribe(
        (response) => {
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

  search(page: number, query?: string | null): void {
    this.configurationParams.query = query;
    this.configurationParams.page = page;

    if (query && query.length > 1) {
      this.getAllTodo(this.configurationParams);
    } else {
      this.getAllTodo(
        this._configService.getDefaultParamsConfiguration(
          this.configurationParams.page
        )
      );
    }
  }

  navigateToDetails(id: number) {
    this._router.navigate(['admin/todo-details', id]);
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
    this.subscriptions.unsubscribe();
    this.message.destroy();
  }
}
