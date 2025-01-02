import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  HostBinding,
  HostListener,
  OnChanges,
} from '@angular/core';
import { Ivariant } from './button.type';

@Directive({
  selector: '[appButton]',
})
export class ButtonDirective implements OnChanges {
  @Input() variant: Ivariant = 'primary';

  @Input() disabled = false;
  @Input() loading = false;

  @HostBinding('class.disabled') get isDisabled() {
    return this.disabled;
  }

  @HostBinding('class.loading') get isLoading() {
    return this.loading;
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.updateClasses();
  }

  private updateClasses() {
    const button = this.el.nativeElement;

    this.renderer.removeClass(button, 'primary');
    this.renderer.removeClass(button, 'secondary');
    this.renderer.removeClass(button, 'tertiary');
    this.renderer.removeClass(button, 'neutral');

    this.renderer.addClass(button, this.variant);
  }

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
