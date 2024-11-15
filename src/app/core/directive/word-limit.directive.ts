import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appWordLimit]',
  standalone: true,
})
export class WordLimitDirective {
  @Input('appWordLimit') wordLimit = 15;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const words = input.value.split(' ');
    const lastWord = words[words.length - 1];

    if (lastWord.length > this.wordLimit) {
      words[words.length - 1] = lastWord.slice(0, this.wordLimit);
      input.value = words.join(' ');
    }
  }
}
