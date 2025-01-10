import { Component } from '@angular/core';

@Component({
  selector: 'app-select-view',
  templateUrl: './select-view.component.html',
  styleUrl: './select-view.component.scss',
})
export class SelectViewComponent {
  onValueChange(value: string) {
    console.log('Selected value:', value);
  }
}
