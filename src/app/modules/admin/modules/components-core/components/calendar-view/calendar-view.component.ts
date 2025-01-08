import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss',
})
export class CalendarViewComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;

  onStartDateChange(date: Date): void {
    this.startDate = date;

    // Nếu startDate lớn hơn endDate, xóa endDate
    if (this.endDate && this.startDate > this.endDate) {
      this.endDate = null;
    }
  }

  onEndDateChange(date: Date): void {
    this.endDate = date;

    // Nếu endDate nhỏ hơn startDate, đặt lại startDate
    if (this.startDate && this.endDate < this.startDate) {
      this.startDate = null;
    }
  }
}
