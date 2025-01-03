import { Component } from '@angular/core';
import { EIconNameTypes } from 'src/app/core/enums/icon.enum';
import { IconNameTypes } from 'src/app/shared/components/icon/icon.types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  iconNames = Object.keys(EIconNameTypes).map(
    (key) => EIconNameTypes[key as keyof typeof EIconNameTypes]
  );
  startIcon: IconNameTypes;
  endIcon: IconNameTypes;
}
