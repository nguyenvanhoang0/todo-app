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
import { IBucketSimple } from '../../types/bucket.type';
import { BucketService } from '../../services/bucket/bucket.service';
import { MessageService } from 'src/app/services/message/message.service';
import { InputFieldComponent } from '../../../input-field/input-field.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { TodoDetailsService } from 'src/app/modules/admin/modules/todo-details/services/todo/todo-details.service';

@Component({
  selector: 'app-edit-bocket-form',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, NzButtonModule, FormsModule],
  templateUrl: './edit-bocket-form.component.html',
  styleUrl: './edit-bocket-form.component.scss',
})
export class EditBocketFormComponent implements OnDestroy, OnInit {
  @Input() id?: number;
  @Output() complete = new EventEmitter<void>();

  private subscriptions: Subscription = new Subscription();

  bucket: IBucketSimple = {
    title: '',
    public: false,
  };

  constructor(
    private _bucketService: BucketService,
    private _todoDetailsService: TodoDetailsService,
    private _message: MessageService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.getBucketDetails(this.id);
    }
  }

  getBucketDetails(id: number): void {
    this.subscriptions.add(
      this._todoDetailsService.getBucketById(id).subscribe(
        (response) => {
          this.bucket = response.data;
        },
        (error) => {
          console.error('Error get bucket details:', error);
        }
      )
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this._message.createMessageloading();
    if (this.id) {
      this._bucketService.updateBucket(this.bucket, this.id).subscribe(
        (response) => {
          this._message.createMessage('success', response);
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
