import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnDestroy,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { PortalService } from './portal.service';

@Component({
  selector: 'tt-portal',
  imports: [],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalComponent implements AfterViewInit, OnDestroy {
  #portalService = inject(PortalService);

  host = input.required<HTMLElement>();
  width = input<number>();

  portalContent = viewChild('portalContent', { read: TemplateRef });

  top = signal(0);
  left = signal(0);

  constructor() {
    effect(() => {
      const host = this.host();

      if (!host) {
        return;
      }

      const { bottom, left } = host.getBoundingClientRect();

      this.top.set(bottom);
      this.left.set(left);
    });
  }

  ngAfterViewInit() {
    const portalContent = this.portalContent();

    if (!portalContent) {
      return;
    }

    this.#portalService.render(portalContent);
  }

  ngOnDestroy() {
    this.#portalService.destroy();
  }
}
