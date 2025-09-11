import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { SidebarPortalService } from './sidebar-portal.service';

@Component({
  selector: 'tt-sidebar-portal',
  imports: [],
  templateUrl: './sidebar-portal.component.html',
  styleUrl: './sidebar-portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarPortalComponent implements AfterViewInit {
  #sidebarPortalService = inject(SidebarPortalService);

  portalContent = viewChild('portalContent', {
    read: TemplateRef,
  });

  ngAfterViewInit() {
    const portalContent = this.portalContent();

    if (!portalContent) {
      return;
    }

    this.#sidebarPortalService.render(portalContent);
  }
}
