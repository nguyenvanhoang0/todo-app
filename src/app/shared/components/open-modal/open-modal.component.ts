import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './services/modal/modal.service';

@Component({
  selector: 'app-open-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './open-modal.component.html',
  styleUrl: './open-modal.component.scss',
})
export class OpenModalComponent implements OnInit ,OnDestroy{
  @Input() canCloseByOutsideClick = false;
  @Input() modalId= '';
  @Output() Visible = new EventEmitter<boolean>();

  @Input() isVisible = false;
  private subscription?: Subscription;

  constructor(private _modalService: ModalService) {}

  ngOnInit(): void {
    if (this.modalId) {
      this.subscription = this._modalService
        .isVisible(this.modalId)
        ?.subscribe((isVisible) => {
          console.log(`Modal ${this.modalId} visible:`, isVisible);
          this.isVisible = isVisible;
        });
    }
  }

  changeVisible(): void {
    if (this.modalId) {
      this._modalService.hide(this.modalId);
    } else {
      this.isVisible = false;
      this.Visible.emit(false);
    }    
  }

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
