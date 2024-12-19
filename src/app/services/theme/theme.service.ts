import { Injectable } from '@angular/core';
import { ThemeType } from 'src/app/shared/components/change-theme/change-theme.types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'selected-theme';

  constructor() {
    const savedTheme = this.getSavedTheme();
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('red');
    }
  }

  setTheme(theme: ThemeType) {
    document.body.className = `theme-${theme}`;
    localStorage.setItem(this.THEME_KEY, theme);
  }

  getTheme(): ThemeType {
    return (localStorage.getItem(this.THEME_KEY) as ThemeType) || 'red';
  }

  private getSavedTheme(): ThemeType | null {
    return localStorage.getItem(this.THEME_KEY) as ThemeType | null;
  }
}
