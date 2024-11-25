import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IBucketItemSimple } from '../../types/bucket-item.type';
import { BucketItemService } from '../../services/bucket-item/bucket-item.service';
import { MessageService } from 'src/app/services/message/message.service';
import { InputFieldComponent } from '../../../input-field/input-field.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-bucket-item-form',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, NzButtonModule, FormsModule],
  templateUrl: './add-bucket-item-form.component.html',
  styleUrl: './add-bucket-item-form.component.scss',
})
export class AddBucketItemFormComponent implements OnDestroy {
  @Input() id?: number;
  @Input() content?: string;
  @Input() parentId?: number;

  @Output() complete = new EventEmitter<void>();

  private subscriptions: Subscription = new Subscription();

  bucket: IBucketItemSimple = {
    content: '',
  };

  constructor(
    private _bucketService: BucketItemService,
    public message: MessageService
  ) {}

  onSubmit(event: Event): void {
    if (this.parentId) {
      this.bucket.parentId = this.parentId
    }
    
    event.preventDefault();
    if (this.id) {
      this.message.createMessageloading();
      this._bucketService.createBucketItem(this.id, this.bucket).subscribe({
        next: () => {
          this.message.createMessage('success', 'create success');
          this.complete.emit();
        },
        error: (err) => {
          this.message.createMessage('error', err);
          console.error(err);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.message.destroy();
  }
}
