import { FormControl } from '@angular/forms';

export type IBucketItemSimple = {
  content: string;
  parentId?: number;
  done?: boolean;
  deadline?: string;
};

export type IBucketItemFormGroup = {
  content: FormControl<string>;
  // parentId: FormControl<number | undefined>;
  done: FormControl<boolean>;
  deadline: FormControl<string>;
  time: FormControl<Date>;
  date: FormControl<Date>;
};
