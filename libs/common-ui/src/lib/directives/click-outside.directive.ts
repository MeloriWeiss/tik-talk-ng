import { Directive, ElementRef, inject, output } from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[ttClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  #hostElement = inject(ElementRef);

  ttClickOutside = output<void>();

  constructor() {
    fromEvent(document.body, 'click')
      .pipe(
        filter((event) => {
          return !this.isClickInsideHostElement(event.target as HTMLElement);
        }),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.ttClickOutside.emit();
      });
  }

  isClickInsideHostElement(clickedElement: HTMLElement) {
    return (
      clickedElement === this.#hostElement.nativeElement ||
      (this.#hostElement.nativeElement as HTMLElement).contains(clickedElement)
    );
  }
}
