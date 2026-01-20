import { Directive, ElementRef, inject } from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[ttClickOut]',
  standalone: true,
})
export class ClickOutDirective {
  #hostElement = inject<ElementRef<HTMLElement>>(ElementRef);

  #clickOut$ = fromEvent(document.body, 'click').pipe(
    filter((event) => {
      return !this.#hostElement.nativeElement.contains(
        event.target as HTMLElement
      );
    }),
  );

  ttClickOut = outputFromObservable(this.#clickOut$);
}
