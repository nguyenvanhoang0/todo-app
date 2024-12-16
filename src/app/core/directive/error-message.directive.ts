import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IErrorMessages } from '../types/error.type';

type IParams = {
  fieldName: string;
};

@Directive({
  selector: '[error]',
  standalone: true,
})
export class ErrorMessageDirective implements OnChanges {
  @Input() error: IErrorMessages | null | undefined = null;
  @Input() params: IParams | null = null;
  @Input() show = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private translate: TranslateService
  ) {}

  ngOnChanges(): void {
    console.log(this.show);
    console.log(this.error);
    console.log(this.params);
    
    const displayError = this.show && !!this.error && !!this.params;
    if (this.error && this.params) {
      const message = this.getErrorMessage(this.error, this.params);
      this.renderer.setStyle(
        this.el.nativeElement,
        'display',
        displayError ? 'inline' : 'none'
      );

      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', message);
    }
  }

  private getErrorMessage(
    error: IErrorMessages,
    params: { fieldName: string; requiredLength?: number }
  ): string {
    if (error.required) {
      return this.translate.instant('ERROR.REQUIRED', {
        fieldName: params.fieldName,
      });
    }

    if (error.minlength) {
      return this.translate.instant('ERROR.MIN_LENGTH', {
        fieldName: params.fieldName,
        requiredLength: error.minlength.requiredLength,
      });
    }

    if (error.email) {
      return this.translate.instant('ERROR.INVALID_EMAIL', {
        fieldName: params.fieldName,
      });
    }

    return '';
  }
}
