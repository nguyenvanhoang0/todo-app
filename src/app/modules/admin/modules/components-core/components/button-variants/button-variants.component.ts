import { Component } from '@angular/core';
import { Ivariant } from 'src/app/shared/directive/variant.type';

@Component({
  selector: 'app-button-variants',
  templateUrl: './button-variants.component.html',
  styleUrl: './button-variants.component.scss',
})
export class ButtonVariantsComponent {
  variants: Ivariant[] = ['primary', 'secondary', 'tertiary', 'neutral'];
  variant: Ivariant = 'neutral';
  disabled = false;
  loading = false;
  label = 'sâs';

  changeVariant(variant: Ivariant) {
    this.variant = variant;
  }

  changeLabel(label: string) {
    this.label = label;
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  toggleLoading() {
    this.loading = !this.loading;
  }
}
