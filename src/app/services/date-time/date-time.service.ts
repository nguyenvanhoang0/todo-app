import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  toLocalISOString(date: Date): string {
    const localDate = new Date(date);
    const offset = localDate.getTimezoneOffset();
    localDate.setMinutes(localDate.getMinutes() - offset);
    return localDate
      .toISOString()
      .replace('Z', `+${String(offset / -60).padStart(2, '0')}:00`);
  }

  getRoundedDateTimeFormatted(date?: Date): Date {
    const now = date ? date : new Date();
    const minutes = now.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 5) * 5;

    now.setMinutes(roundedMinutes);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  }

  combineDateAndTime(day: Date, time: Date): Date {
    return new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );
  }

  extractTime(deadlineDate: Date): Date {
    return new Date(
      1970,
      0,
      1,
      deadlineDate.getHours(),
      deadlineDate.getMinutes(),
      deadlineDate.getSeconds()
    );
  }

  extractDate(deadlineDate: Date): Date {
    return new Date(
      deadlineDate.getFullYear(),
      deadlineDate.getMonth(),
      deadlineDate.getDate()
    );
  }
}
