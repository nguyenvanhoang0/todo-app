import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBucket } from './types/todo.type';
import { TodoService } from './services/todo/todo.service';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnDestroy ,OnInit{
  private eventSubscription!: Subscription;
  searchControl = new FormControl('', { updateOn: 'change' });
  searchContent? : string;


  buckets: IBucket[] = [];

  constructor(
    private _todoService: TodoService,
    public message: MessageService
  ) {}

ngOnInit(): void {
  this.searchControl.valueChanges
  .pipe(debounceTime(1000), distinctUntilChanged())
  .subscribe((value) => {
    this.searchContent= value ? value : undefined;
  });
}

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
