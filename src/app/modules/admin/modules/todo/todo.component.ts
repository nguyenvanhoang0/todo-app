import { Component, OnDestroy } from '@angular/core';
import { IBucket } from './types/todo.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnDestroy {
  private searchSubscription: Subscription = new Subscription();
  searchContent?: string;
  buckets: IBucket[] = [];

  onSearch(query: string): void {
    this.searchContent = query;
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
