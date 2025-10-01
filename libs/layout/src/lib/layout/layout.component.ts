import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ModalHostComponent } from '@tt/common-ui';

@Component({
  selector: 'tt-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ModalHostComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
