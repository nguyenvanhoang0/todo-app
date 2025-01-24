import { Component } from '@angular/core';
import { DropdownOption } from 'src/app/shared/components/custom-select/custom-select.types';

@Component({
  selector: 'app-select-view',
  templateUrl: './select-view.component.html',
  styleUrl: './select-view.component.scss',
})
export class SelectViewComponent {
  onValueChange(value: string) {
    console.log('Selected value:', value);
  }

  options: DropdownOption[] = [
    {
      label: 'Option 1',
      value: 'option1',
    },
    {
      label: 'Option 2',
      children: [
        {
          label: 'Option 2.1',
          value: 'option2.1',
        },
        {
          label: 'Option 2.2',
          children: [
            {
              label: 'Option 2.2.1',
              value: 'option2.2.1',
            },
            {
              label: 'Option 2.2.2',
              value: 'option2.2.2',
            },
          ],
        },
      ],
    },
    {
      label: 'Option 3',
      value: 'option3',
    },
  ];
}
