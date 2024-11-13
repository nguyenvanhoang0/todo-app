import { Component } from '@angular/core';
import { MAIN_ROUTES } from 'src/app/core/types/routes.types';

@Component({
  selector: 'app-nav-bar-body',
  templateUrl: './nav-bar-body.component.html',
  styleUrl: './nav-bar-body.component.scss',
})
export class NavBarBodyComponent {
  protected readonly MAIN_ROUTES = MAIN_ROUTES;
}
