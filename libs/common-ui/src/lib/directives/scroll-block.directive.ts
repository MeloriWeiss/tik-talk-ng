import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[scrollBlock]',
  standalone: true,
})
export class ScrollBlockDirective implements AfterViewInit {
  #r2 = inject(Renderer2);
  #hostElement = inject(ElementRef);
  #destroyRef = inject(DestroyRef);

  bottomPaddingSize = input<number>(1);
  diff = input<number>(0);

  ngAfterViewInit() {
    this.resizeFeed();
    this.#r2.setStyle(this.#hostElement.nativeElement, 'overflow-y', 'scroll');

    fromEvent(window, 'resize')
      .pipe(debounceTime(200), takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.resizeFeed());
  }

  resizeFeed() {
    const { top } = (
      this.#hostElement.nativeElement as HTMLElement
    ).getBoundingClientRect();

    const height =
      window.innerHeight - top - 24 * this.bottomPaddingSize() - this.diff();
    this.#r2.setStyle(this.#hostElement.nativeElement, 'height', height + 'px');
  }
}
