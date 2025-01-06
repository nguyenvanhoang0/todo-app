import { Component } from '@angular/core';

@Component({
  selector: 'app-count-down-view',
  templateUrl: './count-down-view.component.html',
  styleUrl: './count-down-view.component.scss',
})
export class CountDownViewComponent {
  status: 'run' | 'pause' | 'end' | 'retry' = 'pause';

  toggleStatus(status: 'run' | 'pause' | 'end' | 'retry') {
    this.status = status;
  }

  onCountdownFinish() {
    console.log('Countdown finished!');
  }
}
