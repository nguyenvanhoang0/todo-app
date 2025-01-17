/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownOption } from '../../custom-select.types';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-multi-level-dropdown',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './multi-level-dropdown.component.html',
  styleUrl: './multi-level-dropdown.component.scss',
})
export class MultiLevelDropdownComponent implements OnChanges {
  @Input() options: DropdownOption[] = [];
  @Input() isOpen = false;
  @Input() selectedValue: any[] = [];

  @Output() selected = new EventEmitter<any[]>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedValue'] && !changes['selectedValue'].firstChange) {
      this.syncSelectionState(this.selectedValue);
      console.log(3333);
    }
  }

  selectOption(option: DropdownOption) {
    if (option.children?.length) {
      // Xử lý mục cha: chọn hoặc bỏ chọn tất cả các con
      const isSelected = this.isSelected(option);
      this.updateChildrenSelection(option, !isSelected);
    } else {
      // Xử lý mục con: chọn hoặc bỏ chọn
      const index = this.selectedValue.indexOf(option.label);

      if (index > -1) {
        this.selectedValue.splice(index, 1);
      } else {
        this.selectedValue.push(option.label);
      }
    }

    // Cập nhật trạng thái của cha
    this.updateParentSelection(this.options);
    this.selected.emit(this.selectedValue);
  }

  /**
   * Kiểm tra xem một mục có được chọn hay không (bao gồm cả mục cha và mục con)
   */
  isSelected(option: DropdownOption): boolean {
    console.log(2);

    if (option.children?.length) {
      return option.children.every((child) => this.isSelected(child));
    }
    return this.selectedValue.includes(option.label);
  }

  /**
   * Cập nhật trạng thái của mục con (được chọn hoặc bỏ chọn)
   */
  updateChildrenSelection(option: DropdownOption, isSelected: boolean) {
    if (isSelected) {
      if (!this.selectedValue.includes(option.label)) {
        this.selectedValue.push(option.label);
      }
    } else {
      const index = this.selectedValue.indexOf(option.label);
      if (index > -1) {
        this.selectedValue.splice(index, 1);
      }
    }

    // Xử lý đệ quy cho các mục con
    if (option.children?.length) {
      for (const child of option.children) {
        this.updateChildrenSelection(child, isSelected);
      }
    }
    console.log(3);
  }

  /**
   * Cập nhật trạng thái của mục cha dựa trên trạng thái của các con
   */
  updateParentSelection(options: DropdownOption[]) {
    for (const option of options) {
      if (option.children?.length) {
        const isSelected = option.children.every((child) =>
          this.isSelected(child)
        );

        if (isSelected && !this.selectedValue.includes(option.label)) {
          this.selectedValue.push(option.label);
        } else if (!isSelected) {
          const index = this.selectedValue.indexOf(option.label);
          if (index > -1) {
            this.selectedValue.splice(index, 1);
          }
        }

        // Gọi đệ quy cho các mục con
        this.updateParentSelection(option.children);
      }
    }
    console.log(4);
  }

  syncSelectionState(options: DropdownOption[]): void {
    for (const option of options) {
      const isSelected = this.isSelected(option);

      if (isSelected && !this.selectedValue.includes(option.label)) {
        this.selectedValue.push(option.label);
      } else if (!isSelected) {
        const index = this.selectedValue.indexOf(option.label);
        if (index > -1) {
          this.selectedValue.splice(index, 1);
        }
      }

      // Đệ quy xử lý cho các mục con
      if (option.children?.length) {
        this.syncSelectionState(option.children);
      }
    }
  }
}
