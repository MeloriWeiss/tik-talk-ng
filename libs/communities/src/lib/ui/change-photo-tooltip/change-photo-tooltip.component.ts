import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'tt-change-photo-tooltip',
  imports: [SvgIconComponent],
  templateUrl: './change-photo-tooltip.component.html',
  styleUrl: './change-photo-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePhotoTooltipComponent {}
