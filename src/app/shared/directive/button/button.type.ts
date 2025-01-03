export const variant = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  neutral: 'neutral',
} as const;
export const Size = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type Ivariant = (typeof variant)[keyof typeof variant];

export type ISize = (typeof Size)[keyof typeof Size];
