import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { IconNameTypes } from '../icon/icon.types';
import { IErrorMessages } from 'src/app/core/types/error.type';

@Component({
  selector: 'app-form-item',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './form-item.component.html',
  styleUrl: './form-item.component.scss',
  host: {
    '(focusin)': 'onFocus()',
    '(focusout)': 'onBlur($event)',
    '(mousedown)': 'onMouseDown($event)',
    // '(click)': 'onContainerClick()',
  },
})
export class FormItemComponent {
  @Input() iconStart: IconNameTypes;
  @Input() iconEnd: IconNameTypes;
  @Input() disabled = false;
  @Input() error?: IErrorMessages | null | undefined = null;
  @Output() focused = new EventEmitter<boolean>();

  isFocused = false;

  @ContentChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('containerRef', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;
  @ContentChild('prefixRef') prefixRef!: ElementRef<HTMLInputElement>;
  @ContentChild('suffixRef') suffixRef!: ElementRef<HTMLInputElement>;

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onFocus() {
    if (this.isFocused === false) {
      this.isFocused = true;
      this.focused.emit(this.isFocused);
      console.log('kkk');
    }
  }

  onBlur(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement;

    // Nếu click vào phần tử không mong muốn, đặt lại focus
    if (
      !relatedTarget ||
      !this.containerRef.nativeElement.contains(relatedTarget)
    ) {
      console.log('Container lost focus');
      this.isFocused = false;

      this.focused.emit(this.isFocused);
    } else {
      // Đặt lại focus nếu vẫn trong container
      setTimeout(() => {
        this.inputRef.nativeElement.focus();
      }, 200);
    }
  }

  onMouseDown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.containerRef.nativeElement.contains(target)) {
      event.preventDefault();
    }
  }

  onContainerClick(event: MouseEvent) {
    if (
      this.inputRef?.nativeElement &&
      document.activeElement !== this.inputRef.nativeElement &&
      this.isFocused === false
    ) {
      event.stopPropagation();
      this.inputRef.nativeElement.focus();
    }
  }
}
