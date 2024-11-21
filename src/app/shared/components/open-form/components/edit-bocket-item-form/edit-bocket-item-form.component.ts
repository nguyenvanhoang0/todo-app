import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IBucketItemSimple } from '../../types/bucket-item.type';
import { BucketItemService } from '../../services/bucket-item/bucket-item.service';
import { MessageService } from 'src/app/services/message/message.service';
import { TodoItemService } from 'src/app/modules/admin/modules/todo-details/services/todo-item/todo-item.service';
import { InputFieldComponent } from '../../../input-field/input-field.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-bocket-item-form',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, NzButtonModule, FormsModule],
  templateUrl: './edit-bocket-item-form.component.html',
  styleUrl: './edit-bocket-item-form.component.scss',
})
export class EditBocketItemFormComponent implements OnInit, OnDestroy {
  @Input() id?: number;
  @Input() parentId?: number;
  @Input() content?: string;
  @Output() complete = new EventEmitter<void>();

  private subscriptions: Subscription = new Subscription();

  bucketItem: IBucketItemSimple = {
    content: '',
  };

  constructor(
    private _bucketItemService: BucketItemService,
    private _todoItemService: TodoItemService,
    public message: MessageService
  ) {}

  ngOnInit(): void {
    if (this.id && this.parentId) {
      this.getBucketDetails(this.id, this.parentId);
    }
  }

  getBucketDetails(id: number, parentId: number): void {
    this.subscriptions.add(
      this._todoItemService.getBucketItemsById(id, parentId).subscribe({
        next: (response) => {
          this.bucketItem = response.data;
        },
        error: (err) => {
          if (this.content) {
            this.bucketItem.content = this.content;
          }
          console.error('Error get bucket item:', err);
        },
      })
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.message.createMessageloading();
    if (this.id && this.parentId) {
      this._bucketItemService
        .updateBucketItem(this.bucketItem, this.id, this.parentId)
        .subscribe({
          next: (response) => {
            this.message.createMessage('success', response);
            this.complete.emit();
          },
          error: (err) => {
            this.message.createMessage('error', err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.message.destroy();
  }
}
