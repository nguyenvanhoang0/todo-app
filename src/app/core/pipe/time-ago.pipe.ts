import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  constructor(private translate: TranslateService,private cdRef: ChangeDetectorRef) {
    this.translate.onLangChange.subscribe(() => {
      this.cdRef.detectChanges(); // Đảm bảo rằng thay đổi ngôn ngữ sẽ làm mới giá trị trong template
    });
  }


  
  transform(value: Date): string {
    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return this.translate.instant('YEARS', { count: interval });
    if (interval === 1) return this.translate.instant('ONE_YEAR');
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return this.translate.instant('MONTHS', { count: interval });
    if (interval === 1) return this.translate.instant('ONE_MONTH');
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return this.translate.instant('DAYS', { count: interval });
    if (interval === 1) return this.translate.instant('ONE_DAY');
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return this.translate.instant('HOURS', { count: interval });
    if (interval === 1) return this.translate.instant('ONE_HOUR');
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return this.translate.instant('MINUTES', { count: interval });
    if (interval === 1) return this.translate.instant('ONE_MINUTE');
    
    return this.translate.instant('SECONDS', { count: seconds });
  }
}
