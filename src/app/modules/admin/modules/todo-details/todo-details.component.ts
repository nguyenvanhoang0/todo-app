import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoDetailsService } from './services/todo/todo-details.service';
import { Subscription } from 'rxjs';
import { IBucket } from '../todo/types/todo.type';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent implements OnInit {
  todoId?: number;
  
  private subscriptions: Subscription = new Subscription();

  bucket!: IBucket;

  constructor(
    private route: ActivatedRoute,
    private _todoDetailsService: TodoDetailsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.todoId = Number(params.get('id'));
      console.log(this.todoId);
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
          console.error('Error fetching author details:', error);
        }
      )
    );
  }
}
