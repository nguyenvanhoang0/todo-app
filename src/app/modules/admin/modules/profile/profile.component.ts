import { Component, OnDestroy, OnInit} from '@angular/core';
import { IUserInfo } from 'src/app/core/store/_auth/_auth.types';
import { Observable, Subscription, take } from 'rxjs';
import { selectUserInfo } from 'src/app/core/store/_auth/_auth.selectors';
import { Store } from '@ngrx/store';
import { MainState } from 'src/app/core/store/_store.types';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/modules/auth/services/api/auth-api.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnDestroy , OnInit{
  private subscriptions: Subscription = new Subscription();
  private eventSubscription!: Subscription;

  confirmationForm = false;
  updateForm = false;
  accountView = false;
  avatar?: string;

  userInfo$: Observable<IUserInfo | undefined> =
    this._store.select(selectUserInfo);

  constructor(
    private _store: Store<MainState>,
    private _router: Router,
    private _message: MessageService,
    private _authApiService: AuthApiService,
  ) {
    this.userInfo$.subscribe();
  }

  ngOnInit(): void {
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
        }
      })
    );
  }

  handleClickUpdate() {
    this._router.navigate(['admin/update-me']).then();
  }
  
  onConfirm(confirm: boolean) {
    if (confirm === true) {
      this.confirmationForm = false;
      this._authApiService.logout();
    } else {
      this.confirmationForm = false;
    }
  }

  ngOnDestroy() {
    if(this.eventSubscription){
      this.eventSubscription.unsubscribe();
    }
    this.subscriptions.unsubscribe();
    this._message.destroy();
  }
}
