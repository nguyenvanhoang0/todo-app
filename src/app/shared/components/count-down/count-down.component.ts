import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Iformat, IStatus } from './count-down.type';

@Component({
  selector: 'app-count-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './count-down.component.html',
  styleUrl: './count-down.component.scss',
})
export class CountDownComponent implements OnChanges, OnDestroy {
  @Input() duration = 0;
  @Input() status: IStatus = 'pause';
  @Input() format: Iformat = 'hh:mm:ss';
  @Output() finish = new EventEmitter<void>();
  initialDuration = 0;
  remainingTime = 0;
  formattedTime = '';
  private timerSubscription?: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['duration'] && changes['duration'].currentValue) {
      this.initialDuration = this.duration;
      this.remainingTime = this.duration;
      this.updateFormattedTime();
    }

    if (
      (changes['status'] && changes['status'].currentValue) ||
      (changes['format'] && changes['format'].currentValue)
    ) {
      this.handleStatusChange(this.status);
      this.updateFormattedTime();
    }
  }

  handleStatusChange(status: 'run' | 'pause' | 'end' | 'retry'): void {
    if (status === 'run') {
      this.startTimer();
    } else if (status === 'pause') {
      this.stopTimer();
    } else if (status === 'end') {
      this.endTimer();
    } else if (status === 'retry') {
      this.retryTimer();
    }
  }

  startTimer(): void {
    if (!this.timerSubscription) {
      this.timerSubscription = interval(1000).subscribe(() => {
        this.remainingTime -= 1000;
        this.updateFormattedTime();
        if (this.remainingTime <= 0) {
          this.stopTimer();
          this.finish.emit();
        }
      });
    }
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  endTimer(): void {
    this.stopTimer();
    this.remainingTime = 0;
    this.updateFormattedTime();
    this.finish.emit();
  }

  retryTimer(): void {
    this.stopTimer();
    this.remainingTime = this.initialDuration;
    this.updateFormattedTime();
  }

  updateFormattedTime(): void {
    const totalSeconds = Math.max(Math.floor(this.remainingTime / 1000), 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const totalminutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    switch (this.format) {
      case 'hh:mm:ss':
        this.formattedTime = `${this.pad(hours)}:${this.pad(
          minutes
        )}:${this.pad(seconds)}`;
        break;
      case 'mm:ss':
        this.formattedTime = `${this.pad(totalminutes)}:${this.pad(seconds)}`;
        break;
      case 'ss':
        this.formattedTime = `${totalSeconds}`;
        break;
    }
    console.log(3, this.formattedTime);
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
