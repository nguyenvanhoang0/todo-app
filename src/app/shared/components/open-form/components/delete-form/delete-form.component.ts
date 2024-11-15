import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EMessageType } from 'src/app/core/enums/message.enums';
import { BucketService } from '../../services/bucket/bucket.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule
  ],
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrl: './delete-form.component.scss'
})
export class DeleteFormComponent implements OnDestroy {
  @Input() id?: number;
  @Input() delete: 'Bucket' | 'Bucket item' = 'Bucket';
  @Output() complete = new EventEmitter<void>();
  Message=  EMessageType;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private _messageService: NzMessageService,
    private _bucketService: BucketService,
  ) { }

  onDelete(): void {
    if (this.id) {
      switch (this.delete) {
        case 'Bucket':
          this._bucketService.deleteBucket(this.id).subscribe(
            () => {
              this.done(EMessageType.SUCCESS)
            },
            error => {
              this.done(EMessageType.ERROR)
              console.log(error);
              
            }
          );
          break;
      }
    }
  }

  done(message: EMessageType) {
    if (message != EMessageType.CANCEL) {
      this.createMessage(message)
    }
    this.complete.emit();
  }

  createMessage(type: string): void {
    this._messageService.create(type, `${this.delete} deleted ${type}`);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
