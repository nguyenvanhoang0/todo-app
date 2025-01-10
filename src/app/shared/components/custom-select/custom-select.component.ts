import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputComponent } from 'src/app/modules/admin/modules/components-core/components/input/input.component';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Input() placeholder = 'Select an option';

  isOpen = false;
  selectedValue: string | null = null;
  filteredOptions: string[] = [];

  private onChange: (value: string) => void = () => {
    //
  };
  private onTouched: () => void = () => {
    //
  };

  // Mở hoặc đóng dropdown
  ngOnInit() {
    this.filteredOptions = this.options;
  }

  // Mở dropdown
  openDropdown() {
    this.isOpen = true;
  }

  // Đóng dropdown khi mất focus
  closeDropdown() {
    setTimeout(() => {
      this.isOpen = false;
      this.onTouched();
    }, 200); // Delay nhỏ để tránh sự kiện bị xung đột với click
  }

  selectOption(option: string) {
    this.selectedValue = option;
    this.isOpen = false;
    this.onChange(option); // Cập nhật giá trị cho FormControl
    this.onTouched(); // Đánh dấu là đã chạm
  }

  filterOptions(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(value)
    );
  }

  // Các phương thức của ControlValueAccessor
  writeValue(value: string): void {
    this.selectedValue = value || null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Nếu cần hỗ trợ disabled, có thể thêm logic ở đây
  }
}
