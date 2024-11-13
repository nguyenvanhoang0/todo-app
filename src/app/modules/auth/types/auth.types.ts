import {FormControl} from "@angular/forms";

export type ILoginFormGroup = {
  email: FormControl<string>,
  password: FormControl<string>
}


export type IRegisterFormGroup = {
  email: FormControl<string>,
  password: FormControl<string>,
  username: FormControl<string>,
}

export type IRegister = {
  email: string,
  password: string,
  username: string
}

