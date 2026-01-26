import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { ChangePhotoTooltipComponent } from '../change-photo-tooltip/change-photo-tooltip.component';
import { firstValueFrom } from 'rxjs';
import {
  CommunitiesService,
  CommunityImageType,
  selectCommunity,
} from '@tt/data-access/communities';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tt-community-banner',
  imports: [ChangePhotoTooltipComponent],
  templateUrl: './community-banner.component.html',
  styleUrl: './community-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityBannerComponent {
  #communitiesService = inject(CommunitiesService);

  #community = inject(Store).selectSignal(selectCommunity);

  bannerUrl = input<string | null>();

  resultBannerUrl = linkedSignal(() => `/yt-course/${this.bannerUrl()}`);

  onUploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      this.resultBannerUrl.set(event.target?.result?.toString() ?? '');

      const community = this.#community();

      if (!community) return;

      firstValueFrom(
        this.#communitiesService.uploadImage({
          community_id: community.id,
          image_type: CommunityImageType.BANNER,
          image_file: file,
        })
      ).then();
    };

    reader.readAsDataURL(file);
  }
}
