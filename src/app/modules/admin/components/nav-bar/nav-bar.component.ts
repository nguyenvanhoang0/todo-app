import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserInfo } from 'src/app/core/store/_auth/_auth.types';
import { selectUserInfo } from 'src/app/core/store/_auth/_auth.selectors';
import { Store } from '@ngrx/store';
import { MainState } from 'src/app/core/store/_store.types';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  @Input() avatar? = '';

  userInfo$: Observable<IUserInfo | undefined> =
    this._store.select(selectUserInfo);

  constructor(private _store: Store<MainState>) {
    this.userInfo$.subscribe();
  }
}
