import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormPatchModule } from 'ng-zorro-antd/core/form';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ChangeLanguageComponent } from 'src/app/shared/components/change-language/change-language.component';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessageDirective } from 'src/app/core/directive/error-message.directive';
import { CustomInputComponent } from 'src/app/shared/components/custom-input/custom-input.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    ErrorMessageDirective,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzFormPatchModule,
    NzFormModule,
    ChangeLanguageComponent,
    CustomInputComponent,
  ],
})
export class AuthModule {}
