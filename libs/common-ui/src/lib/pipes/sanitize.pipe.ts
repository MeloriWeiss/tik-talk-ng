import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitize',
  standalone: true,
})
export class SanitizePipe implements PipeTransform {
  #sanitizer = inject(DomSanitizer);

  transform(value: string | null) {
    if (!value) return;

    return this.#sanitizer.bypassSecurityTrustHtml(value);
  }
}
