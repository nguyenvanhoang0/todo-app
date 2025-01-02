import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { IconNameTypes } from '../icon/icon.types';
import { ISize, Ivariant, Size, variant } from '../../directive/button.type';
/* eslint-disable @angular-eslint/component-selector */

@Component({
  selector: 'button[app-custom-button]',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
  host: {
    class: 'btn',
    '[class.btn-primary]': `variant() === "primary"`,
    '[class.btn-secondary]': `variant() === "secondary"`,
    '[class.btn-tertiary]': `variant() === "tertiary"`,
    '[class.btn-neutral]': `variant() === "neutral"`,
    '[class.btn-small]': `size() === "small"`,
    '[class.btn-medium]': `size() === "medium"`,
    '[class.btn-large]': `size() === "large"`,
    '[class.btn-disabled]': 'disabled',
    '[class.btn-loading]': 'loading',
    '[class.btn-hide-content]': 'hideContent',
  },
})
export class CustomButtonComponent {
  @Input() iconStart: IconNameTypes;
  @Input() iconEnd: IconNameTypes;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() hideContent = false;

  readonly variant = input<Ivariant>(variant.primary);
  readonly size = input<ISize>(Size.medium);
}
