import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoDetailsService } from './services/todo/todo-details.service';
import { Subscription } from 'rxjs';
import { IBucket } from '../todo/types/todo.type';
import { EventService } from '../../services/event/event.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private eventSubscription!: Subscription;
  searchContent= '';

  todoId!: number;
  bucket?: IBucket;
  totalBucketDone?: number;
  totalBucketNotDone?: number;
  constructor(
    private _route: ActivatedRoute,
    private _eventService: EventService,
    private _todoDetailsService: TodoDetailsService,
    public message: MessageService
  ) {}

  ngOnInit(): void {
    this.eventSubscription = this._eventService.event$.subscribe((event) => {
      if (
        event.id === 'edit bucket' ||
        event.id === 'add bucket' ||
        event.id === 'deleteBucket'
      ) {
        this.getBucketDetails(this.todoId);
      }
    });
    this.getIDBucket();
  }

  getIDBucket() {
    this._route.paramMap.subscribe((params) => {
      this.todoId = Number(params.get('id'));
      this.getBucketDetails(this.todoId);
    });
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
  }

  getTotalBucketNotDone(Total: number) {
    this.totalBucketNotDone = Total;
  }

  onSearch(query: string): void {
    this.searchContent = query;
  }

  TotalBucket(): number {
    return (
      (this.totalBucketDone ? this.totalBucketDone : 0) +
      (this.totalBucketNotDone ? this.totalBucketNotDone : 0)
    );
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
    this.subscriptions.unsubscribe();
    this.message.destroy();
  }
}
