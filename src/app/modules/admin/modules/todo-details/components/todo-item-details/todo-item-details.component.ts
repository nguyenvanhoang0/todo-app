import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IBucketItem } from '../../types/todo-item.type';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { BucketItemService } from 'src/app/shared/components/open-form/services/bucket-item/bucket-item.service';
import { IBucketItemSimple } from 'src/app/shared/components/open-form/types/bucket-item.type';
import { EventService } from 'src/app/modules/admin/services/event/event.service';

@Component({
  selector: 'app-todo-item-details',
  templateUrl: './todo-item-details.component.html',
  styleUrl: './todo-item-details.component.scss',
})
export class TodoItemDetailsComponent implements OnDestroy, OnChanges {
  @Input() bucketItem!: IBucketItem;
  @Output() done = new EventEmitter<boolean>();

  private subscriptions: Subscription = new Subscription();
  bucket: IBucketItemSimple = {
    content: '',
  };
  constructor(
    private _bucketItemService: BucketItemService,
    private _eventService: EventService,
    private _message: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bucketItem']) {
      this.bucketItem = changes['bucketItem'].currentValue;
    }
  }

  updateStatus(): void {
    this.bucket = this.bucketItem;
    this.bucket.done = !this.bucket.done;
    this._message.createMessageloading();
    if (this.bucketItem) {
      const targetId = this.bucketItem.parentId
        ? this.bucketItem.parentId
        : this.bucketItem.bucketId;

      if (targetId) {
        this.subscriptions.add(
          this._bucketItemService
            .updateBucketItem(this.bucket, this.bucketItem.id, targetId)
            .subscribe({
              next: () => {
                this._message.createMessage('success', 'Update successful');
                this._eventService.emitEvent();
                this.done.emit(false);
              },
              error: (err) => {
                this._message.createMessage('error', 'Update failed');
                console.error(err);
              },
            })
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this._message.destroy();
  }
}
