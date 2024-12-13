import { FormControl } from '@angular/forms';

export type IBucketItemSimple = {
  content: string;
  parentId?: number;
  done?: boolean;
  deadline?: Date;
};

export type IBucketItemFormGroup = {
  content: FormControl<string>;
  parentId: FormControl<number>;
  done: FormControl<boolean>;
  deadline: FormControl<Date>;
  time: FormControl<Date>;
  date: FormControl<Date>;
};
