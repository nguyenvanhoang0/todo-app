export type message = 'success' | 'error' | 'cancel';

export type IValidationResponse ={
    message: string;          
    errors: IErrorDetail[];  
    status: string; 
}

export type IErrorDetail ={
    message: string;  
}
