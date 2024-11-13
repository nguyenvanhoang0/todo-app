import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-open-modal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './open-modal.component.html',
  styleUrl: './open-modal.component.scss'
})
export class OpenModalComponent {
  @Output() Visible = new EventEmitter<boolean>();

  changeVisible() {
    this.Visible.emit(false);
  }

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation(); 
  }
}
