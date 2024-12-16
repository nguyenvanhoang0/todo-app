export type IErrorMessages = {
    required?: boolean;
    minlength?: { requiredLength: number; actualLength: number };
    maxlength?: { requiredLength: number; actualLength: number };
    email?: boolean;
  };