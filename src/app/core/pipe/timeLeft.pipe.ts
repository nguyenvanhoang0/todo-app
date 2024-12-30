import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeLeft',
  pure: true,
})
export class TimeLeftPipe implements PipeTransform {
  transform(date: string | Date): string {
    const now = new Date();

    const diff = new Date(date).getTime() - now.getTime();
    if (diff < 0) {
      return 'Missed deadline';
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else {
      return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(
        2,
        '0'
      )}`;
    }
  }
  // }
}
