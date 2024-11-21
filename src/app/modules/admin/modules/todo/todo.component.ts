import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBucket } from './types/todo.type';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnDestroy, OnInit {
  // private eventSubscription!: Subscription;
  private searchSubscription: Subscription = new Subscription();

  searchControl = new FormControl('', { updateOn: 'change' });
  searchContent?: string;

  buckets: IBucket[] = [];

  // constructor(
  //   // private _todoService: TodoService,
  //   // public message: MessageService
  // ) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.searchContent = value ? value : undefined;
      });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
