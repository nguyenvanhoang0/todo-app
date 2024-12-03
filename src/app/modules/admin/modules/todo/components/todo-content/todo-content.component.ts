import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IQueryParams } from 'src/app/modules/admin/types/query-params.type';
import { IBucket } from '../../types/todo.type';
import { TodoService } from '../../services/todo/todo.service';
import { MessageService } from 'src/app/services/message/message.service';
import { EventService } from 'src/app/modules/admin/services/event/event.service';
import { Router } from '@angular/router';
import { ConfigurationParamsService } from 'src/app/modules/admin/services/configuration-params/configuration-params.service';

@Component({
  selector: 'app-todo-content',
  templateUrl: './todo-content.component.html',
  styleUrl: './todo-content.component.scss',
})
export class TodoContentComponent implements OnInit, OnDestroy, OnChanges {
  @Input() searchContent?: string;

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
    public message: MessageService
  ) {}

  ngOnInit(): void {
    this.eventSubscription = this._eventService.event$.subscribe((event) => {
      if (
        event.id === 'edit bucket' ||
        event.id === 'add bucket' ||
        event.id === 'deleteBucket'
      ) {
        this.getAllTodo(this.configurationParams);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchContent']) {
      this.search(changes['searchContent'].currentValue);
    }
  }

  onPageChange(page: number): void {
    this.configurationParams.page = page;
    this.search(this.searchContent);
  }

  getAllTodo(params: IQueryParams): void {
    this.message.createMessageloading(false);

    this.subscriptions.add(
      this._todoService.getBuckets(params).subscribe(
        (response) => {
          if (
            response.data.length === 0 &&
            response.total > 0 &&
            this.configurationParams.page > Math.ceil(response.total / this.configurationParams.limit)
          ) {
            this.configurationParams.page = Math.ceil(response.total / this.configurationParams.limit)
            this.search(this.searchContent);
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

  search(query?: string | null): void {
    if (query && query.length > 1) {
      this.configurationParams.query = query;
      this.configurationParams.page = 1;
      this.getAllTodo(this.configurationParams);
    } else {
      this.getAllTodo(
        this._configService.getDefaultParamsConfiguration(
          undefined,
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
