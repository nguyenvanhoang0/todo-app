/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { MultiLevelDropdownComponent } from './components/multi-level-dropdown/multi-level-dropdown.component';
import { DropdownOption } from './custom-select.types';
import { CustomInputV2Component } from '../custom-input-v2/custom-input-v2.component';
import { IconComponent } from '../icon/icon.component';
import { FormItemComponent } from '../form-item/form-item.component';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    CustomInputV2Component,
    MultiLevelDropdownComponent,
    IconComponent,
    FormItemComponent,
  ],
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
export class CustomSelectComponent implements ControlValueAccessor, OnInit {
  @Input() multiLeveloptions: DropdownOption[] = [];
  @Input() options: string[] = [];
  @Input() placeholder = 'Select an option';
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() search = false;
  @Output() valueChange = new EventEmitter<any[]>();
  isOpen = false;
  selectedValue: string | null = null;
  multiselectedValue: any[] = [];
  filteredOptions: string[] = [];

  private onChange: (value: string) => void = () => {
    //
  };
  private onTouched: () => void = () => {
    //
  };

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  writeValue(value: string): void {
    this.selectedValue = value || null;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  changeFocus(focus: boolean) {
    console.log(focus);

    if (focus) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  openDropdown() {
    this.isOpen = true;
    console.log(1111);
  }

  closeDropdown() {
    setTimeout(() => {
      this.isOpen = false;
      this.onTouched();
    }, 200);
    console.log(222);
  }

  multiselectOption(option: any[]) {
    this.multiselectedValue = option;
    this.onTouched();
  }

  selectOption(option: string) {
    this.selectedValue = option;
    this.isOpen = false;
    this.onChange(option);
    this.onTouched();
  }

  removeSelectedValue(index: number): void {
    this.multiselectedValue.splice(index, 1);
  }

  filterOptions(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(value)
    );
  }

  // setDisabledState?(isDisabled: boolean): void {
  // }
}
