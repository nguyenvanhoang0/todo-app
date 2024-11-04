import { Component, Input, Output ,EventEmitter, forwardRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { IconComponent } from '../icon/icon.component';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    FormsModule,
    NzSkeletonModule,
    IconComponent,
    NzSelectModule,
    NzRadioModule,
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent {
  @Input() inputId!: string;
  @Input() type!: string;
  @Input() controlName!: string;
  @Input() placeholder!: string; 
  @Input() label!: string; 
  @Input() required: boolean = false; 
  @Input() formGroup!: FormGroup; 
  @Input() errorMessage: string | null = null;
  @Output() valueChange = new EventEmitter<string>();

  passwordVisible: boolean = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
