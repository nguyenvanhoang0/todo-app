import { Component } from '@angular/core';
import {
  Iformat,
  IStatus,
} from 'src/app/shared/components/count-down/count-down.type';

@Component({
  selector: 'app-count-down-view',
  templateUrl: './count-down-view.component.html',
  styleUrl: './count-down-view.component.scss',
})
export class CountDownViewComponent {
  status: IStatus = 'pause';
  formats: Iformat[] = ['hh:mm:ss', 'mm:ss', 'ss'];
  format: Iformat = 'hh:mm:ss';
  duration = 24 * 60 * 60 * 1000;

  toggleStatus(status: IStatus) {
    this.status = status;
  }

  toggleformat(format: Iformat) {
    this.format = format;
  }

  onCountdownFinish() {
    console.log('Countdown finished!');
  }
}
