import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/components/open-modal/services/modal/modal.service';
import { AuthApiService } from '../auth/services/api/auth-api.service';
import { filter, Observable, Subscription, take } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { EventService } from './services/event/event.service';
import { IUserInfo } from 'src/app/core/store/_auth/_auth.types';
import { selectUserInfo } from 'src/app/core/store/_auth/_auth.selectors';
import { MainState } from 'src/app/core/store/_store.types';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private eventSubscription!: Subscription;

  confirmationForm = false;
  avatar?: string;

  userInfo$: Observable<IUserInfo | undefined> =
    this._store.select(selectUserInfo);

  constructor(
    private _modalService: ModalService,
    private _authApiService: AuthApiService,
    private _message: MessageService,
    private _eventService: EventService,
    private _store: Store<MainState>
  ) {
    this.userInfo$.subscribe();
  }

  ngOnInit(): void {
    this.eventSubscription = this._eventService.event$.pipe(
      filter(event => event.id === 'updateUser')
    ).subscribe(() => {
      this.getAvatar();
    });
    this.userInfo$.pipe(take(1)).subscribe((userInfo) => {
      if (userInfo?.avatar) {
        this.getAvatar();
      }
    });
  }

  getAvatar(): void {
    this.subscriptions.add(
      this._authApiService.getAvatar().subscribe({
        next: (response: string) => {
          this.avatar = response;
        },
        error: (error) => {
          this._message.createMessage('error', 'Failed to load avatar');
          console.error('Error loading avatar:', error);
        },
      })
    );
  }

  onConfirm(confirm: boolean) {
    if (confirm === true) {
      this.confirmationForm = false;
      this._modalService.hide('Unauthorized');
      this._authApiService.logout();
    } else {
      this.confirmationForm = false;
    }
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
    this.subscriptions.unsubscribe();
    this._message.destroy();
  }
}
