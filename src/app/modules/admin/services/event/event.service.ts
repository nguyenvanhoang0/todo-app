import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventSource = new Subject<{ id?: string | number }>();
  event$ = this.eventSource.asObservable();

  emitEvent(id?: string | number): void {
    this.eventSource.next({ id });
  }
} 
