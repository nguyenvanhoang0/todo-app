import { Injectable } from '@angular/core';
import { EMessageType } from '../../core/enums/message.enums';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IValidationResponse, message } from '../../types/message.type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageId: string | null = null;
  isLoading = false;

  constructor(private message: NzMessageService) {}

  createMessage(
    type: message,
    content: string | IValidationResponse,
    prefix?: string,
    message = true
  ): void {
    if (this.messageId) {
      this.message.remove(this.messageId);      
    }
    this.isLoading = false;
console.log(content);

    if (message) {
      const finalPrefix = prefix !== undefined ? prefix : '';
      let finalMessage: string;
      if (typeof content === 'object') {
        const validationResponse = content as IValidationResponse;
        finalMessage = `${finalPrefix}${validationResponse.message}`;
        this.message.create(type, finalMessage);
      } else {
        finalMessage = `${finalPrefix}${content}`;
        this.message.create(type, finalMessage);
      }
    }
  }

  createMessageloading(messageView = true): void {    
    this.isLoading = true;
    if (messageView) {
      this.messageId = this.message.loading(EMessageType.LOADING, {
        nzDuration: 0,
      }).messageId;
    }
  }

  destroy(): void {
    this.message.remove();
    this.messageId = null;
    this.isLoading = false;
  }
}
