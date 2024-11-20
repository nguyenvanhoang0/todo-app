import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../../../input-field/input-field.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { IBucketSimple } from '../../types/bucket.type';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { BucketService } from '../../services/bucket/bucket.service';

@Component({
  selector: 'app-add-bucket-form',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, NzButtonModule, FormsModule],
  templateUrl: './add-bucket-form.component.html',
  styleUrl: './add-bucket-form.component.scss',
})
export class AddBucketFormComponent implements OnDestroy{
  @Output() complete = new EventEmitter<void>();
  private subscriptions: Subscription = new Subscription();

  bucket: IBucketSimple = {
    title: '',
    public: false,
  };

  constructor(private bucketService: BucketService, private message: MessageService) { }


  onSubmit(event: Event): void {
    event.preventDefault();
    this.message.createMessageloading();
    this.bucketService.createBucket(this.bucket).subscribe(
      response => {
        
        this.message.createMessage('success', response)
        this.complete.emit();
      },
      error => {
        
        this.message.createMessage('error', error)
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.message.destroy()
  }
}
