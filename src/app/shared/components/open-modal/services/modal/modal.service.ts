import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStates: Map<string, BehaviorSubject<boolean>> = new Map();

  constructor() {}

  createModal(id: string): void {
    if (!this.modalStates.has(id)) {
      this.modalStates.set(id, new BehaviorSubject<boolean>(false));
    }
  }

  show(id: string): void {
    const modalState = this.modalStates.get(id);
    if (modalState) {
      modalState.next(true);
    }
  }

  hide(id: string): void {
    const modalState = this.modalStates.get(id);
    if (modalState) {
      modalState.next(false);
    }
  }

  isVisible(id: string) {
    this.createModal(id);
    return this.modalStates.get(id)?.asObservable();
  }
}
