import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    NzButtonModule
  ],
  selector: 'app-confirmation-form',
  templateUrl: './confirmation-form.component.html',
  styleUrl: './confirmation-form.component.scss'
})
export class ConfirmationFormComponent {
  @Input() content = '';
  @Output() confirm = new EventEmitter<boolean>();

  handlecConfirm(confirm : boolean){
    this.confirm.emit(confirm);    
  }

  blockFormClosing(event: Event) {
    event.stopPropagation();
  }

}
