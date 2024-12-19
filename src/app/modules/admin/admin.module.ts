import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { ConfirmationFormComponent } from 'src/app/shared/components/confirmation-form/confirmation-form.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { OpenModalComponent } from 'src/app/shared/components/open-modal/open-modal.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ChangeLanguageComponent } from 'src/app/shared/components/change-language/change-language.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent,
} from 'ng-zorro-antd/layout';
import {
  NzMenuDirective,
  NzMenuItemComponent,
  NzSubMenuComponent,
} from 'ng-zorro-antd/menu';
import { NavBarBodyComponent } from './components/nav-bar/components/nav-bar-body/nav-bar-body.component';
import { AccountComponent } from './components/header-menu/components/account/account.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeThemeComponent } from 'src/app/shared/components/change-theme/change-theme.component';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderMenuComponent,
    NavBarComponent,
    NavBarBodyComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzAvatarModule,
    TranslateModule,
    IconComponent,
    ConfirmationFormComponent,
    OpenModalComponent,
    ChangeLanguageComponent,
    ChangeThemeComponent,
    NzLayoutComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzFooterComponent,
    NzMenuItemComponent,
    NzIconDirective,
    NzSubMenuComponent,
    NzMenuDirective,
    NzSiderComponent,
  ],
})
export class AdminModule {}
