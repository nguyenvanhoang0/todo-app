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

export interface IUpdateUserFormGroup {
  email: FormControl<string>,
  username: FormControl<string>,
  avatar: FormControl<File | null>,
}

export interface IRegister {
  email: string,
  password: string,
  username: string
}

export interface IUpdateUser {
  email: string,
  username: string,
  avatar: File
}
