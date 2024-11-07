import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { StoreModule } from '@ngrx/store';
import { combinedReducers } from './core/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './core/store/_auth/_auth.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiResolverInterceptor } from './core/interceptors/api-resolver.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  ],
  providers: [
    provideHttpClient(withInterceptors([apiResolverInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
