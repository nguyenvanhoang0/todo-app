import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date): string {
    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} last year`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} last month`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} day ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hour ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    return `${seconds} seconds ago`;
  }
}
