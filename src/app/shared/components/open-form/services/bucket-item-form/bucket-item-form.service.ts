import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBucketItemFormGroup } from '../../types/bucket-item.type';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';

@Injectable({
  providedIn: 'root',
})
export class BucketItemFormService {
  private _bucketItemFormGroup!: FormGroup<IBucketItemFormGroup>;

  constructor(
    private _formBuilder: FormBuilder,
    private _dateTimeService: DateTimeService
  ) {}

  get bucketItemFormGroup() {
    if (!this._bucketItemFormGroup) {
      this.initBucketItemForm();
    }
    return this._bucketItemFormGroup;
  }

  initBucketItemForm() {
    const fb = this._formBuilder.nonNullable;
    const now = new Date(Date.now());

    this._bucketItemFormGroup = fb.group({
      content: fb.control('', [Validators.required, Validators.minLength(3)]),
      // parentId: fb.control<number | undefined>(undefined),
      done: fb.control(false),
      deadline: fb.control(''),
      time: fb.control(this._dateTimeService.getRoundedDateTimeFormatted()),
      date: fb.control(now),
    });
  }

  destroy(): void {
    if (this._bucketItemFormGroup) {
      this._bucketItemFormGroup.reset();
    }
  }
}
