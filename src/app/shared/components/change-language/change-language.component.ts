import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { OpenModalComponent } from '../open-modal/open-modal.component';
import { LanguageCode, LANGUAGES } from 'src/app/core/enums/languages.enums';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-language',
  standalone: true,
  imports: [CommonModule, IconComponent, OpenModalComponent],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.scss',
})
export class ChangeLanguageComponent {
  changeLanguageForm = false;
  listLanguage = LANGUAGES;
  language?: string;

  constructor(private translate: TranslateService) {
    this.language = localStorage.getItem('lang') || LanguageCode.EN;
    this.translate.use(this.language);
  }

  openchangeLanguageForm(value: boolean) {
    this.changeLanguageForm = value;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang as LanguageCode);
    this.language = lang
    localStorage.setItem('lang', lang);
    this.changeLanguageForm = false
  }
}
