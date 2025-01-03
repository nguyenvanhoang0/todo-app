import {
  Component,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { IconNameTypes } from '../icon/icon.types';
import { IErrorMessages } from 'src/app/core/types/error.type';

@Component({
  selector: 'app-custom-input-v2',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './custom-input-v2.component.html',
  styleUrl: './custom-input-v2.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputV2Component),
      multi: true,
    },
  ],
})
export class CustomInputV2Component implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() iconStart: IconNameTypes;
  @Input() iconEnd: IconNameTypes;
  @Input() disabled = false;
  @Input() error?: IErrorMessages | null | undefined = null;

  @HostBinding('class.focused') isFocused = false;

  value = '';

  private onChange: (value: string) => void = () => {
    //
  };
  private onTouched: () => void = () => {
    //sss
  };

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('focusin')
  onFocus() {
    this.isFocused = true;
  }

  @HostListener('focusout')
  onBlur() {
    this.isFocused = false;
    this.onTouched();
  }

  onInput(value: string): void {
    this.value = value;
    this.onChange(value);
  }
}
