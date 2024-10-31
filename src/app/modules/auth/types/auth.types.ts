import {FormControl} from "@angular/forms";

export interface ILoginFormGroup {
  email: FormControl<string>,
  password: FormControl<string>
}


export interface IRegisterFormGroup {
  email: FormControl<string>,
  password: FormControl<string>,
  username: FormControl<string>,
}
