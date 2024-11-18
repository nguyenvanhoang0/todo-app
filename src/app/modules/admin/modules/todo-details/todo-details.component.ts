import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoDetailsService } from './services/todo/todo-details.service';
import { Subscription } from 'rxjs';
import { IBucket } from '../todo/types/todo.type';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent implements OnInit ,OnDestroy {
  todoId = 1;
  
  private subscriptions: Subscription = new Subscription();
  private eventSubscription!: Subscription;

  bucket!: IBucket;

  constructor(
    private _route: ActivatedRoute,
    private _eventService: EventService,

    private _todoDetailsService: TodoDetailsService
  ) {}

  ngOnInit(): void {
    if(this.todoId){
      this.eventSubscription = this._eventService.event$.subscribe(() => this.getBucketDetails(this.todoId));

    }

    this._route.paramMap.subscribe((params) => {
      this.todoId = Number(params.get('id'));
      this.getBucketDetails(this.todoId)
    });
  }

  getBucketDetails(id: number): void {
    this.subscriptions.add(
      this._todoDetailsService.getBucketById(id).subscribe(
        (response) => {
          this.bucket = response.data;
        },
        (error) => {
          console.error('Error Fetching Bucket Details:', error);
        }
      )
    );
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
