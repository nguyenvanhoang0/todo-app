import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IExtendDayDetails, IMonthDetails } from './types/date.type';
import { CalendarService } from './services/calendar/calendar.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() monthDetails!: IMonthDetails;
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() dateRangeChange = new EventEmitter<{
    startDate: Date | null;
    endDate: Date | null;
  }>();

  currentDate: Date = new Date();

  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth() + 1;
  daysOfWeek: string[] = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  weeks: IExtendDayDetails[][];

  // startDate: IExtendDayDetails | null = null;
  // endDate: IExtendDayDetails | null = null;

  selectMode: 'single' | 'range' = 'range';
  constructor(
    private calendarService: CalendarService,
    private cdr: ChangeDetectorRef
  ) {
    this.weeks = [];
  }

  ngOnInit(): void {
    this.weeks = [];
    this.calculateDaysInMonth();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthDetails'] && changes['monthDetails'].currentValue) {
      console.log('currentMonth changed:', this.currentMonth);
      this.currentMonth = this.monthDetails.currentMonth;
      this.currentYear = this.monthDetails.currentYear;

      if (this.currentMonth) {
        this.calculateDaysInMonth();
      }
    }
  }

  calculateDaysInMonth() {
    this.weeks = this.calendarService.calculateDaysInMonth(
      this.currentYear,
      this.currentMonth
    );
    this.updateSelectionStates();
  }

  selectDate(day: IExtendDayDetails): void {
    if (this.selectMode === 'single') {
      this.startDate = new Date(day.year, day.month - 1, day.day);
      this.dateSelected.emit(this.startDate);
      this.endDate = null;
    } else if (this.selectMode === 'range') {
      if (!this.startDate || (this.startDate && this.endDate)) {
        this.startDate = new Date(day.year, day.month - 1, day.day);
        this.endDate = null;
      } else if (!this.endDate) {
        const selectedDate = new Date(day.year, day.month - 1, day.day);
        if (selectedDate > this.startDate) {
          this.endDate = selectedDate;
        } else {
          this.endDate = this.startDate;
          this.startDate = selectedDate;
        }
      }
    }
    if (
      this.currentYear > day.year ||
      (this.currentYear === day.year && this.currentMonth > day.month)
    ) {
      this.updateCurrentMonthAndYear(-1);
    } else if (
      this.currentYear < day.year ||
      (this.currentYear === day.year && this.currentMonth < day.month)
    ) {
      this.updateCurrentMonthAndYear(+1);
    }
    this.updateSelectionStates();
    this.emitDateRange();
  }

  updateCurrentMonthAndYear(offset: number) {
    const newMonth = this.currentMonth + offset;

    if (newMonth === 0 || newMonth === 13) {
      this.currentMonth = newMonth === 0 ? 12 : 1;
      this.currentYear += offset > 0 ? 1 : -1;
    } else {
      this.currentMonth = newMonth;
    }

    this.calculateDaysInMonth();
  }

  updateSelectionStates(): void {
    this.weeks.forEach((week) => {
      week.forEach((day) => {
        const currentDate = new Date(day.year, day.month - 1, day.day);

        day.selected =
          day.month !== this.currentMonth
            ? undefined
            : this.selectMode === 'single'
            ? currentDate.getTime() === this.startDate?.getTime()
            : currentDate.getTime() === this.startDate?.getTime() ||
              currentDate.getTime() === this.endDate?.getTime();

        day.inRange =
          this.startDate &&
          this.endDate &&
          this.selectMode === 'range' &&
          day.month === this.currentMonth
            ? currentDate > this.startDate && currentDate < this.endDate
            : undefined;
      });
    });
    console.log(1);
  }

  emitDateRange(): void {
    this.dateRangeChange.emit({
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }
}
