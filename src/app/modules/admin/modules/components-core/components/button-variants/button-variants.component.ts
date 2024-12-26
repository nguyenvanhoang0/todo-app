import { Component } from '@angular/core';
import { ButtonGroups } from '../../types/button.type';

@Component({
  selector: 'app-button-variants',
  templateUrl: './button-variants.component.html',
  styleUrl: './button-variants.component.scss',
})
export class ButtonVariantsComponent {
  buttonGroups: ButtonGroups = {
    variantGroup: [
      {
        variant: 'primary',
        label: 'Primary Button',
        disabled: false,
        loading: false,
      },
      {
        variant: 'secondary',
        label: 'Secondary Button',
        disabled: false,
        loading: false,
      },
      {
        variant: 'neutral',
        label: 'neutral Button',
        disabled: false,
        loading: false,
      },
      {
        variant: 'tertiary',
        label: 'tertiary Button',
        disabled: false,
        loading: false,
      },
    ],
    variantWithDisabledGroup: [
      {
        variant: 'primary',
        label: 'Primary Button (Disabled)',
        disabled: true,
        loading: false,
      },
      {
        variant: 'secondary',
        label: 'secondary Button (Disabled)',
        disabled: true,
        loading: false,
      },
      {
        variant: 'neutral',
        label: 'neutral Button (Disabled)',
        disabled: true,
        loading: false,
      },
      {
        variant: 'tertiary',
        label: 'Tertiary Button (Disabled)',
        disabled: true,
        loading: false,
      },
    ],
    variantWithLoadingGroup: [
      {
        variant: 'primary',
        label: 'primary Button (Loading)',
        disabled: false,
        loading: true,
      },
      {
        variant: 'secondary',
        label: 'secondary Button (Loading)',
        disabled: false,
        loading: true,
      },
      {
        variant: 'neutral',
        label: 'Neutral Button (Loading)',
        disabled: false,
        loading: true,
      },
      {
        variant: 'tertiary',
        label: 'tertiary Button (Loading)',
        disabled: false,
        loading: true,
      },
    ],
    variantWithDisabledAndLoadingGroup: [
      {
        variant: 'secondary',
        label: 'Secondary Button (Disabled and Loading)',
        disabled: true,
        loading: true,
      },
    ],
  };
}
