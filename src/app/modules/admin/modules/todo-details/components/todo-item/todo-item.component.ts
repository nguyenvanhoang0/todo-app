import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBucketItem } from '../../types/todo-item.type';
import { IQueryParams } from 'src/app/modules/admin/types/query-params.type';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent implements OnDestroy{
  @Input() bucketItem: IBucketItem[]=[];
  @Input() totalBuckets = 0;
  @Input() todoItemId = 0;
  @Input() configurationParams:IQueryParams = {
    limit: 99,
    page: 1,
  };;
  @Output() page = new EventEmitter<number>();

  private eventSubscription!: Subscription;

  itemDetailsView = false;
  bucketSelectItem?: IBucketItem;

  onPageChange(page: number): void {
    this.configurationParams.page = page;
  }


  handleItemDetailsView(value: boolean) {
    this.itemDetailsView = value;
  }

  openItemDetailsView(value: boolean , bucketSelectItem:IBucketItem) {
    this.itemDetailsView = value;
    this.bucketSelectItem = bucketSelectItem
  }

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation(); 
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
