import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDayDetails, IMonthDetails } from './types/date.type';
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

  @Output() dateSelected = new EventEmitter<Date>();
  currentDate: Date = new Date();

  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth() + 1;
  daysOfWeek: string[] = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  weeks: IDayDetails[][];
  @Input() viewingDate: IDayDetails = this.calendarService.getTodayDetails();

  constructor(private calendarService: CalendarService) {
    this.weeks = [];
  }

  ngOnInit(): void {
    this.weeks = [];
    this.calculateDaysInMonth();
    console.log(this.monthDetails);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('currentMonth changed:', this.currentMonth);
    this.currentMonth = this.monthDetails.currentMonth;
    this.currentYear = this.monthDetails.currentYear;

    if (this.currentMonth) {
      this.calculateDaysInMonth();
    }
  }

  calculateDaysInMonth() {
    const result = this.calendarService.calculateDaysInMonth(
      this.currentYear,
      this.currentMonth
    );
    this.weeks = result;
  }

  selectDate(date: IDayDetails) {
    this.viewingDate = date;

    this.dateSelected.emit(new Date(date.year, date.month - 1, date.day));
    console.log(this.dateSelected);
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
    // this.emitMonthDetails(this.currentMonth, this.currentYear)
    console.log(4);
  }
}
