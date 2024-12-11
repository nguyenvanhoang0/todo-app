import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputFieldTypes } from './input-field.types';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { WordLimitDirective } from 'src/app/core/directive/word-limit.directive';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
    NzSkeletonModule,
    NzSelectModule,
    NzRadioModule,
    WordLimitDirective,
  ],
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @Input() label = '';
  @Input() id = '';
  @Input() type: InputFieldTypes = 'text';
  @Input() value: string | number | Date | boolean | undefined;
  @Input() placeholder = '';
  @Input() required = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() optionValues?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() labelValues?: any[];
  @Input() multiple?: boolean;

  @Output() valueChange = new EventEmitter<
    string | number | Date | undefined
  >();

  passwordVisible = false;

  onValueChange(event: Event): void {
    const input = (event.target as HTMLInputElement)?.value;
    if (input !== undefined) {
      this.value = input;
      this.valueChange.emit(this.value);
    }
  }
}
