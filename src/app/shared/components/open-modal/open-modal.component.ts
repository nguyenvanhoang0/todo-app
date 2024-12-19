import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './services/modal/modal.service';
import { location } from './open-modal.types';

@Component({
  selector: 'app-open-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './open-modal.component.html',
  styleUrl: './open-modal.component.scss',
})
export class OpenModalComponent implements OnInit, OnDestroy {
  @Input() canCloseByOutsideClick = false;
  @Input() modalId = '';
  @Input() isVisible = false;
  @Input() location: location = 'top';
  @Output() Visible = new EventEmitter<boolean>();

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
