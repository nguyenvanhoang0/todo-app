export type IDayDetails = {
  day: number;
  month: number;
  year: number;
  status: string;
};

export type IExtendDayDetails = IDayDetails & {
  selected?: boolean;
  inRange?: boolean;
};

export type IMonthDetails = {
  currentMonth: number;
  currentYear: number;
};
