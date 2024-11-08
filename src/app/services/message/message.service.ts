import { Injectable } from '@angular/core';
import { EMessageType } from '../../core/enums/message.enums';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IValidationResponse } from '../../types/message.type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageId: string | null = null;
  isLoading = false;

  constructor(private message: NzMessageService) {}

  createMessage(type: string, content: string | IValidationResponse): void {
    if (this.messageId && this.isLoading) {
      this.message.remove(this.messageId);
      this.isLoading = false;
    }    

    if (typeof content === 'object' && 'errors' in content) {
      const validationResponse = content as IValidationResponse;

      if (validationResponse.errors.length > 0) {
        const firstError = validationResponse.errors[0];
        this.message.create(type, firstError.message);
      }
    } else {
      this.message.create(type, content);
    }
  }

  createMessageloading(): void {
    this.isLoading = true;
    this.messageId = this.message.loading(EMessageType.LOADING, {
      nzDuration: 0,
    }).messageId;
  }
}
