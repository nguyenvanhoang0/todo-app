import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IBucketItemFormGroup } from '../../types/bucket-item.type';
import { BucketItemService } from '../../services/bucket-item/bucket-item.service';
import { MessageService } from 'src/app/services/message/message.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BucketItemFormService } from '../../services/bucket-item-form/bucket-item-form.service';
import { CustomInputComponent } from '../../../custom-input/custom-input.component';
import {
  NzTimePickerComponent,
  NzTimePickerModule,
} from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';

@Component({
  selector: 'app-add-bucket-item-form',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTimePickerModule,
    NzDatePickerModule,
    CustomInputComponent,
  ],
  templateUrl: './add-bucket-item-form.component.html',
  styleUrl: './add-bucket-item-form.component.scss',
})
export class AddBucketItemFormComponent implements OnDestroy {
  @Input() id?: number;
  @Input() content?: string;
  @Input() parentId?: number;
  @Output() complete = new EventEmitter<void>();

  @ViewChild('timePicker') TimePicker!: NzTimePickerComponent;

  private subscriptions: Subscription = new Subscription();

  bucketItemFormGroup: FormGroup<IBucketItemFormGroup> =
    this._bucketItemFormService.bucketItemFormGroup;

  selectedTime: Date | null = null;

  constructor(
    private _bucketService: BucketItemService,
    private _bucketItemFormService: BucketItemFormService,
    private _dateTimeService: DateTimeService,
    public message: MessageService
  ) {}

  get bucketItemFormControl() {
    return this.bucketItemFormGroup.controls;
  }

  onSubmit(): void {
    this.updateDeadline();
    if (this.parentId) {
      // this.bucketItemFormGroup.get('parentId')?.setValue(this.parentId);
      // this.bucket.parentId = this.parentId;
    }
    if (this.bucketItemFormGroup.invalid) {
      Object.values(this.bucketItemFormControl).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
        }
      });
    } else {
      if (this.id) {
        this.message.createMessageloading();
        this._bucketService
          .createBucketItem(this.id, this.bucketItemFormGroup.getRawValue())
          .subscribe({
            next: () => {
              this.message.createMessage('success', 'create success');
              this.complete.emit();
            },
            error: (err) => {
              this.message.createMessage('error', err.error);
              console.error('Registration error:', err);
            },
          });
      }
    }
  }

  updateDeadline() {
    const time = this.bucketItemFormGroup.get('time')?.value;
    const date = this.bucketItemFormGroup.get('date')?.value;
    if (time && date) {
      const deadline = this._dateTimeService.combineDateAndTime(date, time);
      this.bucketItemFormGroup
        .get('deadline')
        ?.setValue(this._dateTimeService.toLocalISOString(deadline));
    }
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.TimePicker.open();
    }
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.message.destroy();
    this._bucketItemFormService.destroy();
  }
}
