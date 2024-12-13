import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBucketItemFormGroup } from '../../types/bucket-item.type';

@Injectable({
  providedIn: 'root',
})
export class BucketItemFormService {
  private _bucketItemFormGroup!: FormGroup<IBucketItemFormGroup>;

  constructor(private _formBuilder: FormBuilder) {}

  get bucketItemFormGroup() {
    if (!this._bucketItemFormGroup) {
      console.log(1);

      this.initBucketItemForm();
    }
    console.log(this._bucketItemFormGroup);

    return this._bucketItemFormGroup;
  }

  initBucketItemForm() {
    const fb = this._formBuilder.nonNullable;
    const now = new Date(Date.now());

    this._bucketItemFormGroup = fb.group({
      content: fb.control('', [Validators.required]),
      parentId: fb.control(0),
      done: fb.control(false),
      deadline: fb.control(new Date(Date.now() + 1000 * 60 * 60 * 24)),
      time: fb.control(new Date(now.setHours(0, 0, 0, 0))),
      date: fb.control(now),
    });
  }
}
