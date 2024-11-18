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
  @Output() complete = new EventEmitter<void>();
  @Input() id?: number;

  private subscriptions: Subscription = new Subscription();

  bucket: IBucketItemSimple = {
    content: '',
  };

  constructor(
    private bucketService: BucketItemService,
    private message: MessageService
  ) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.id) {
      this.message.createMessageloading();
      this.bucketService.createBucketItem(this.id, this.bucket).subscribe(
        (response) => {
          this.message.createMessage('success', 'create success');
          console.log(response);

          this.complete.emit();
        },
        (error) => {
          this.message.createMessage('error', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
