import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  HostBinding,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[appInput]',
  host: {
    class: 'ip',
    '[class.ip-disabled]': 'disabled',
  },
})
export class InputDirective implements OnChanges {
  @Input() disabled = false;

  @HostBinding('class.disabled') get isDisabled() {
    return this.disabled;
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.updateClasses();
  }

  private updateClasses() {
    //   const button = this.el.nativeElement;
    //   this.renderer.removeClass(button, 'neutral');
    //   this.renderer.addClass(button, this.variant);
  }
}
