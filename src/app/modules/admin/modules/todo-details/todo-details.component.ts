import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoDetailsService } from './services/todo/todo-details.service';
import { Subscription } from 'rxjs';
import { IBucket } from '../todo/types/todo.type';
import { EventService } from '../../services/event/event.service';
import { MessageService } from 'src/app/services/message/message.service';
import { SelectService } from '../../services/select/select.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private eventSubscription!: Subscription;
  private routeSubscription: Subscription | undefined;

  searchContent = this.getSearchContent();

  todoId!: number;
  bucket?: IBucket;

  totalBucketDone?: number;
  totalBucketNotDone?: number;
  total?: number;

  filter = true;
  selectionMode = false;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _eventService: EventService,
    private _todoDetailsService: TodoDetailsService,
    private _selectService: SelectService,

    private _cdr: ChangeDetectorRef,
    public message: MessageService
  ) {}

  ngOnInit(): void {
    this.listenToBucketChanges();
    this.getIDBucket();
  }

  listenToBucketChanges() {
    this.eventSubscription = this._eventService.event$.subscribe((event) => {
      if (
        event.id === 'edit bucket' ||
        event.id === 'add bucket' ||
        event.id === 'deleteBucket'
      ) {
        this.getBucketDetails(this.todoId);
      }
    });
  }

  getIDBucket() {
    this.routeSubscription = this._route.paramMap.subscribe((params) => {
      this.todoId = Number(params.get('id'));
      this.getBucketDetails(this.todoId);
      this._selectService.clearBucketItems();
      this.selectionMode = false;
    });
  }

  getSearchContent(): string {
    const currentParams = { ...this._route.snapshot.queryParams };
    return currentParams ? currentParams['search'] || '' : '';
  }

  getBucketDetails(id: number): void {
    this.message.createMessageloading(false);
    this.subscriptions.add(
      this._todoDetailsService.getBucketById(id).subscribe({
        next: (response) => {
          this.bucket = response.data;
          this.message.createMessage('success', 'loading success', '', false);
        },
        error: (err) => {
          if (err.status !== 404) {
            this.message.createMessage('error', err);
            console.error('Error Fetching Bucket Details:', err);
          } else {
            this.message.createMessage('error', err, '', false);
            this.bucket = undefined;
            this.totalBucketDone = undefined;
            this.totalBucketNotDone = undefined;
          }
        },
      })
    );
  }

  getTotalBucketDone(Total: number) {
    this.totalBucketDone = Total;
    this.TotalBucket();
  }

  getTotalBucketNotDone(Total: number) {
    this.totalBucketNotDone = Total;
    this.TotalBucket();
  }

  getTotalBucket(Total: number) {
    this.total = Total;
  }

  TotalBucket() {
    this.total =
      (this.totalBucketDone ? this.totalBucketDone : 0) +
      (this.totalBucketNotDone ? this.totalBucketNotDone : 0);
  }

  onSearch(search: string): void {
    const currentParams = { ...this._route.snapshot.queryParams };
    this._router.navigate([`admin/todo-details/${this.todoId}`], {
      queryParams: { ...currentParams, search },
    });
  }

  onfilter() {
    this.filter = !this.filter;
    if (this.filter) {
      this.totalBucketNotDone = 0;
    }
  }

  updateSelectionMode(newMode: boolean): void {
    this.selectionMode = newMode;
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    this.eventSubscription.unsubscribe();
    this.subscriptions.unsubscribe();
    this.message.destroy();
  }
}
