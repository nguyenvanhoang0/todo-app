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
  @Output() previewVisible = new EventEmitter<boolean>();

  changeVisible() {
    this.previewVisible.emit(false);
  }

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation(); 
  }
}
