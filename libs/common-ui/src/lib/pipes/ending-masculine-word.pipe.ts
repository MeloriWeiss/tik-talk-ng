import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endingMasculineWord',
  standalone: true,
})
export class EndingMasculineWordPipe implements PipeTransform {
  transform(count: number | null | undefined, word: string) {
    if (count === null || count === undefined) {
      return null;
    }
    if (count % 10 > 4 || count % 10 === 0 || (count > 4 && count < 21)) {
      return `${count} ${word}ов`;
    }
    if (count % 10 === 1) {
      return `${count} ${word}`;
    }
    return `${count} ${word}а`;
  }
}
