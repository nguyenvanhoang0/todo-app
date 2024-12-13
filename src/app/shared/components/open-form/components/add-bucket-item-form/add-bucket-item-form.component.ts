import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { IBucketItemFormGroup } from '../../types/bucket-item.type';
import { BucketItemService } from '../../services/bucket-item/bucket-item.service';
import { MessageService } from 'src/app/services/message/message.service';
import { InputFieldComponent } from '../../../input-field/input-field.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BucketItemFormService } from '../../services/bucket-item-form/bucket-item-form.service';
import { CustomInputComponent } from '../../../custom-input/custom-input.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-add-bucket-item-form',
  standalone: true,
  imports: [
    CommonModule,
    InputFieldComponent,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomInputComponent,
    NzTimePickerModule,
    NzDatePickerModule,
  ],
  templateUrl: './add-bucket-item-form.component.html',
  styleUrl: './add-bucket-item-form.component.scss',
})
export class AddBucketItemFormComponent implements OnDestroy {
  @Input() id?: number;
  @Input() content?: string;
  @Input() parentId?: number;

  @Output() complete = new EventEmitter<void>();

  private subscriptions: Subscription = new Subscription();
  private _unsubscribe$ = new Subject<void>();

  bucketItemFormGroup: FormGroup<IBucketItemFormGroup> =
    this._bucketItemFormService.bucketItemFormGroup;

  selectedTime: Date | null = null;

  constructor(
    private _bucketService: BucketItemService,
    private _bucketItemFormService: BucketItemFormService,
    public message: MessageService
  ) {}

  get bucketItemFormControl() {
    return this.bucketItemFormGroup.controls;
  }

  onSubmit(): void {
    console.log(this.selectedTime);

    if (this.parentId) {
      // this.bucket.parentId = this.parentId;
    }
    if (this.bucketItemFormGroup.invalid) {
      console.log(1111);

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this.message.destroy();
  }
}
