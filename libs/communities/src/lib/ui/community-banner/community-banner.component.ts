import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';

@Component({
  selector: 'tt-community-banner',
  imports: [ImgUrlPipe],
  templateUrl: './community-banner.component.html',
  styleUrl: './community-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityBannerComponent {
  bannerUrl = input<string | null>();
}
