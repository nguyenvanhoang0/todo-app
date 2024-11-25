import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserInfo } from 'src/app/core/store/_auth/_auth.selectors';
import { IUserInfo } from 'src/app/core/store/_auth/_auth.types';
import { MainState } from 'src/app/core/store/_store.types';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss',
})
export class HeaderMenuComponent {
  @Input() avatar? = '';
  accountView = false;
  userInfo$: Observable<IUserInfo | undefined> =
    this._store.select(selectUserInfo);

  constructor(private _store: Store<MainState>) {
    this.userInfo$.subscribe();
  }
  handleAccountView(value: boolean) {
    this.accountView = value;
  }
}
