import { Component } from '@angular/core';
import { EIconNameTypes } from 'src/app/core/enums/icon.enum';
import { IconNameTypes } from 'src/app/shared/components/icon/icon.types';
import { ISize, Ivariant } from 'src/app/shared/directive/button/button.type';

@Component({
  selector: 'app-button-variants',
  templateUrl: './button-variants.component.html',
  styleUrl: './button-variants.component.scss',
})
export class ButtonVariantsComponent {
  variants: Ivariant[] = ['primary', 'secondary', 'tertiary', 'neutral'];
  sizes: ISize[] = ['large', 'medium', 'small'];
  variant: Ivariant = 'primary';
  size: ISize = 'medium';
  disabled = false;
  loading = false;
  hideContent = false;
  label = 'button';
  startIconContent?: string;
  endIconContent?: string;
  iconNames = Object.keys(EIconNameTypes).map(
    (key) => EIconNameTypes[key as keyof typeof EIconNameTypes]
  );
  startIcon: IconNameTypes;
  endIcon: IconNameTypes;

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
  click() {
    console.log(1);
  }
  click2(event: Event) {
    console.log(2);
    event.stopPropagation();
  }
}
