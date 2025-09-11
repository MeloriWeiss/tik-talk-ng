import { Directive, ElementRef, inject, output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { filter, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  #document = inject(DOCUMENT);
  #hostElement = inject(ElementRef);

  clickOutside = output<void>();

  constructor() {
    fromEvent(this.#document, 'click')
      .pipe(
        filter((event) => {
          return !this.isClickInsideHostElement(event.target as HTMLElement);
        }),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.clickOutside.emit();
      });
  }

  isClickInsideHostElement(clickedElement: HTMLElement) {
    return (
      clickedElement === this.#hostElement.nativeElement ||
      (this.#hostElement.nativeElement as HTMLElement).contains(clickedElement)
    );
  }
}
