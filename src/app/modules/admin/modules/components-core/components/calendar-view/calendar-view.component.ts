import { Component } from '@angular/core';
import { IMonthDetails } from 'src/app/shared/components/calendar/types/date.type';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss',
})
export class CalendarViewComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;
  currentYear = new Date().getFullYear();
  isOpen = false;
  monthsInCurrentYear: IMonthDetails[] = Array.from(
    { length: 12 },
    (_, index) => ({
      currentMonth: index + 1,
      currentYear: this.currentYear,
    })
  );
  onStartDateChange(date: Date): void {
    this.startDate = date;

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

  changeFocus(focus: boolean) {
    console.log(focus);

    if (focus) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  private onTouched: () => void = () => {
    //
  };
  openDropdown() {
    this.isOpen = true;
    console.log(1111);
  }

  closeDropdown() {
    setTimeout(() => {
      this.isOpen = false;
      this.onTouched();
    }, 200);
    console.log(222);
  }
}
