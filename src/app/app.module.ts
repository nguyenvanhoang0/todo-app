import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { StoreModule } from '@ngrx/store';
import { combinedReducers } from './core/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './core/store/_auth/_auth.effects';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { apiResolverInterceptor } from './core/interceptors/api-resolver.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import {
  ModuleTranslateLoader,
  IModuleTranslationOptions,
} from '@larscom/ngx-translate-module-loader';

export function moduleHttpLoaderFactory(http: HttpClient) {
  const baseTranslateUrl = './assets/i18n';

  const options: IModuleTranslationOptions = {
    modules: [
      // { baseTranslateUrl },
      { baseTranslateUrl: `${baseTranslateUrl}/auth` },
      { baseTranslateUrl: `${baseTranslateUrl}/admin` },
      { baseTranslateUrl: `${baseTranslateUrl}/profile` },
      { baseTranslateUrl: `${baseTranslateUrl}/todo` },
      { baseTranslateUrl: `${baseTranslateUrl}/todo-details` },
      { baseTranslateUrl: `${baseTranslateUrl}/update-profile` },
      { baseTranslateUrl: `${baseTranslateUrl}/time-ago` },
      // { baseTranslateUrl: `${baseTranslateUrl}/bucket`}
    ],
  };

  return new ModuleTranslateLoader(http, options);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    NzMessageModule,
    RouterModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(combinedReducers),
    EffectsModule.forRoot([AuthEffect]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: moduleHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    provideHttpClient(withInterceptors([apiResolverInterceptor])),
    { provide: NZ_I18N, useValue: en_US },
  ],
  exports: [TranslateModule],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
}
