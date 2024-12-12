import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RedirectService } from './services/redirect/redirect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'fe-simple-elysia';

  constructor(
    private _router: Router,
    private redirectService: RedirectService
  ) {}
  ngOnInit(): void {
    window.addEventListener('beforeunload', () => {
      // this.redirectService.saveUrl(this._router.url);
    });
  }
}
