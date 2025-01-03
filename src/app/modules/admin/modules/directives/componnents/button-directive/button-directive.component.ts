import { Component } from '@angular/core';
import { Ivariant } from 'src/app/shared/directive/button/button.type';

@Component({
  selector: 'app-button-directive',
  templateUrl: './button-directive.component.html',
  styleUrl: './button-directive.component.scss',
})
export class ButtonDirectiveComponent {
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
