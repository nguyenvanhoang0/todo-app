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
  @Output() complete = new EventEmitter<void>();
  @Input() id?: number;
  @Input() parentId?: number;

  private subscriptions: Subscription = new Subscription();

  bucket: IBucketItemSimple = {
    content: '',
  };

  constructor(
    private _bucketItemService: BucketItemService,
    private _todoItemService: TodoItemService,
    private _message: MessageService
  ) {}

  ngOnInit(): void {
    if (this.id && this.parentId) {
      this.getBucketDetails(this.id, this.parentId);
    }
  }

  getBucketDetails(id: number, parentId: number): void {
    this.subscriptions.add(
      this._todoItemService.getBucketItemsById(id, parentId).subscribe(
        (response) => {
          this.bucket = response.data;
        },
        (error) => {
          console.error('Error get bucket item:', error);
        }
      )
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this._message.createMessageloading();
    if (this.id && this.parentId) {
      this._bucketItemService
        .updateBucketItem(this.bucket, this.id, this.parentId)
        .subscribe(
          (response) => {
            this._message.createMessage('success',response);
            this.complete.emit();
          },
          (error) => {
            this._message.createMessage('error', error);
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this._message.destroy()
  }
}
