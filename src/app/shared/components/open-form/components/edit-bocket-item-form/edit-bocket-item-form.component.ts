import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  IBucketItemFormGroup,
  IBucketItemSimple,
} from '../../types/bucket-item.type';
import { BucketItemService } from '../../services/bucket-item/bucket-item.service';
import { MessageService } from 'src/app/services/message/message.service';
import { InputFieldComponent } from '../../../input-field/input-field.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NzTimePickerComponent,
  NzTimePickerModule,
} from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CustomInputComponent } from '../../../custom-input/custom-input.component';
import { BucketItemFormService } from '../../services/bucket-item-form/bucket-item-form.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';

@Component({
  selector: 'app-edit-bocket-item-form',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    FormsModule,
    NzTimePickerModule,
    NzDatePickerModule,
    InputFieldComponent,
    CustomInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-bocket-item-form.component.html',
  styleUrl: './edit-bocket-item-form.component.scss',
})
export class EditBocketItemFormComponent implements OnDestroy, OnChanges {
  @Input() id?: number;
  @Input() parentId?: number;
  @Input() content?: string;
  @Input() contents?: IBucketItemSimple;
  @Output() complete = new EventEmitter<void>();

  @ViewChild('timePicker') TimePicker!: NzTimePickerComponent;

  private subscriptions: Subscription = new Subscription();

  bucketItemFormGroup: FormGroup<IBucketItemFormGroup> =
    this._bucketItemFormService.bucketItemFormGroup;

  constructor(
    private _bucketItemService: BucketItemService,
    private _bucketItemFormService: BucketItemFormService,
    private _dateTimeService: DateTimeService,

    public message: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contents'] && this.contents && this.contents.deadline) {
      const deadlineDate = new Date(this.contents.deadline);

      this.bucketItemFormGroup.patchValue({
        content: this.contents.content || '',
        done: this.contents.done || false,
        deadline: this.contents.deadline || '',
        time: this._dateTimeService.extractTime(deadlineDate),
        date: this._dateTimeService.extractDate(deadlineDate),
      });
    }
  }

  get bucketItemFormControl() {
    return this.bucketItemFormGroup.controls;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.message.createMessageloading();
    this.updateDeadline();

    if (this.bucketItemFormGroup.invalid) {
      Object.values(this.bucketItemFormControl).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
        }
      });
    } else {
      if (this.id && this.parentId) {
        this._bucketItemService
          .updateBucketItem(
            this.bucketItemFormGroup.getRawValue(),
            this.id,
            this.parentId
          )
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
