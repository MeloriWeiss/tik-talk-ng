import {
  AfterViewInit,
  Directive,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  Renderer2,
} from '@angular/core';
import { CollapsibleService } from '../services/collapsible.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[ttCollapsible]',
})
export class CollapsibleDirective implements AfterViewInit {
  #elementRef = inject(ElementRef);
  #r2 = inject(Renderer2);
  #injector = inject(Injector);
  #collapsibleService = inject(CollapsibleService, {
    optional: true
  });

  isOpened = input(false);

  constructor() {
    this.#collapsibleService?.collapsibleTrigger.pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      const element: HTMLElement = this.#elementRef.nativeElement;

      this.#r2.setStyle(this.#elementRef.nativeElement, 'height', 'auto');
      this.#r2.setStyle(element, 'height', element.offsetHeight + 'px');
    });
  }

  ngAfterViewInit() {
    const element: HTMLElement = this.#elementRef.nativeElement;
    let height = element.offsetHeight;

    this.#r2.setStyle(element, 'transition', 'height .3s ease');
    this.#r2.setStyle(element, 'overflow', 'hidden');

    effect(
      () => {
        if (this.isOpened()) {
          this.#r2.setStyle(element, 'height', height + 'px');
          return;
        }

        height = element.offsetHeight;
        this.#r2.setStyle(element, 'height', 0);
      },
      { injector: this.#injector }
    );
  }
}
