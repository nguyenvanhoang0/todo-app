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

export type IUpdateUserFormGroup = {
  email: FormControl<string>,
  username: FormControl<string>,
  avatar: FormControl<File | null>,
}

export type IRegister = {
  email: string,
  password: string,
  username: string
}

export type IUpdateUser = {
  email: string,
  username: string,
  avatar: File
}
