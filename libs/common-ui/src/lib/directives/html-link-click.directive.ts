import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[ttHtmlLinkClick]',
  standalone: true,
})
export class HtmlLinkClickDirective implements OnDestroy {
  #elementRef = inject(ElementRef);
  #r2 = inject(Renderer2);
  #router = inject(Router);

  postContentClickUnlisten!: () => void;

  constructor() {
    this.postContentClickUnlisten = this.#r2.listen(
      this.#elementRef.nativeElement,
      'click',
      (event: MouseEvent) => {
        const href = (event.target as HTMLElement).dataset['href'];

        if (!href) return;

        this.#router.navigate([href]).then();
      }
    );
  }

  ngOnDestroy() {
    this.postContentClickUnlisten();
  }
}
