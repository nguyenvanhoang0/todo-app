import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalComponent } from '../open-modal/open-modal.component';
import { IconComponent } from '../icon/icon.component';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ThemeType } from './change-theme.types';
import { OpenFormComponent } from '../open-form/open-form.component';

@Component({
  selector: 'app-change-theme',
  standalone: true,
  imports: [CommonModule, IconComponent, OpenModalComponent, OpenFormComponent],
  templateUrl: './change-theme.component.html',
  styleUrl: './change-theme.component.scss',
})
export class ChangeThemeComponent {
  themes: ThemeType[] = ['red', 'blue', 'gray'];
  selectedTheme: ThemeType;
  changeThemeForm = false;

  constructor(private themeService: ThemeService) {
    this.selectedTheme = this.themeService.getTheme();
  }

  changeTheme(theme: ThemeType) {
    this.themeService.setTheme(theme);
    this.selectedTheme = theme;
  }

  openChangeThemeForm(value: boolean) {
    this.changeThemeForm = value;
  }
}
