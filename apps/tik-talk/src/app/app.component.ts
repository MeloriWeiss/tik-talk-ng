import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortalService } from '@tt/common-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  #portalService = inject(PortalService);

  @ViewChild('portalHost', { read: ViewContainerRef })
  set portalHost(portalHost: ViewContainerRef) {
    if (!portalHost) {
      return;
    }

    this.#portalService.registerContainer(portalHost);
  }

  // constructor() {
  //   this.#router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //     }
  //   });
  // }
}
