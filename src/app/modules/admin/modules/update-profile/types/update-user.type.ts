import { FormControl } from '@angular/forms';

export type IUpdateUserFormGroup = {
  email: FormControl<string>;
  username: FormControl<string>;
  avatar: FormControl<File | null>;
};

export type IUpdateUser = {
  email: string;
  username: string;
  avatar: File | null;
};
