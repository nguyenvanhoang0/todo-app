import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ErrorMessageDirective } from 'src/app/core/directive/error-message.directive';
import { IErrorMessages } from 'src/app/core/types/error.type';
import { NzFormPatchModule } from 'ng-zorro-antd/core/form';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    ErrorMessageDirective,
    NzFormPatchModule,
    NzFormModule,
  ],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => CustomInputComponent),
    //   multi: true,
    // },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() value = '';
  @Input() error?: IErrorMessages | null | undefined = null;
  @Input() label?: string;
  @Input() id?: string;

  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() required = false;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  /* eslint-disable @typescript-eslint/no-empty-function */
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  isDisabled = false;

  isDirty = false;
  isTouched = false;

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onChange(input.value);
    this.isDirty = true;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onBlur(): void {
    this.onTouched();
    this.isTouched = true;
  }
}
