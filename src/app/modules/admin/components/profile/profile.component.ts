import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUserInfo } from 'src/app/core/store/_auth/_auth.types';
import { Observable } from 'rxjs';
import { selectUserInfo } from 'src/app/core/store/_auth/_auth.selectors';
import { Store } from '@ngrx/store';
import { MainState } from 'src/app/core/store/_store.types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  userInfo$: Observable<IUserInfo | undefined> = this._store.select(selectUserInfo);

  constructor(private _store: Store<MainState>) {
    this.userInfo$.subscribe()
  }
}
