import { Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconNameTypes, IconThemeTypes } from './icon.types';


@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() name: IconNameTypes = 'plus';
  @Input() theme: IconThemeTypes = 'outline';
}
