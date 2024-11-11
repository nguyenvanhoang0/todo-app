import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { StoreModule } from '@ngrx/store';
import { combinedReducers } from './core/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './core/store/_auth/_auth.effects';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiResolverInterceptor } from './core/interceptors/api-resolver.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations:[AppComponent],
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
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideHttpClient(withInterceptors([apiResolverInterceptor])),
  ],
  exports: [TranslateModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
