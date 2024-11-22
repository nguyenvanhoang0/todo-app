import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoDetailsService } from './services/todo/todo-details.service';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { IBucket } from '../todo/types/todo.type';
import { EventService } from '../../services/event/event.service';
import { MessageService } from 'src/app/services/message/message.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private eventSubscription!: Subscription;
  searchControl = new FormControl('', { updateOn: 'change' });
  searchContent?: string;

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
    this.eventSubscription = this._eventService.event$.subscribe(() =>
      this.getBucketDetails(this.todoId)
    );
    this.getIDBucket();
    this.searchWithDebounce();
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
          this.message.createMessage('error', err);
          console.error('Error Fetching Bucket Details:', err);
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

  searchWithDebounce(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.searchContent = value ? value : undefined;
      });
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
    this.subscriptions.unsubscribe();
    this.message.destroy();
  }
}
