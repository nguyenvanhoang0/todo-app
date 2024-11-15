import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventSource = new Subject<void>();
  event$ = this.eventSource.asObservable();

  emitEvent() :void {
    this.eventSource.next();
  }
}
