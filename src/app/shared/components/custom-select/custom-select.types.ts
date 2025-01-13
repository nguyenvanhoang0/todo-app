export type DropdownOption = {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  disabled?: boolean;
  children?: DropdownOption[];
};
