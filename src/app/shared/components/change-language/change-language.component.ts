import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { OpenModalComponent } from '../open-modal/open-modal.component';
import { LanguageCode, LANGUAGES } from 'src/app/core/enums/languages.enums';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, en_US, vi_VN } from 'ng-zorro-antd/i18n';

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

  constructor(
    private translate: TranslateService,
    private nzI18n: NzI18nService
  ) {
    this.language = localStorage.getItem('lang') || LanguageCode.EN;
    this.translate.use(this.language);
    // this.setZorroLanguage(this.language);
  }

  openchangeLanguageForm(value: boolean) {
    this.changeLanguageForm = value;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang as LanguageCode);
    // this.setZorroLanguage(lang);
    this.language = lang;
    localStorage.setItem('lang', lang);
    this.changeLanguageForm = false;
  }

  // private setZorroLanguage(lang: string): void {
  //   switch (lang) {
  //     case LanguageCode.VI:
  //       this.nzI18n.setLocale(vi_VN);
  //       break;
  //     case LanguageCode.EN:
  //       this.nzI18n.setLocale(en_US);
  //       break;
  //     default:
  //       this.nzI18n.setLocale(en_US);
  //       break;
  //   }
  // }
}
