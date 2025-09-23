import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { CommunitiesService, Community } from '@tt/data-access/communities';
import { AvatarCircleComponent, EndingMasculineWordPipe, SvgIconComponent } from '@tt/common-ui';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectMe } from '@tt/data-access/profile';

@Component({
  selector: 'tt-community-card',
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    RouterLink,
    EndingMasculineWordPipe,
  ],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardComponent {
  #communitiesService = inject(CommunitiesService);
  #store = inject(Store);

  me = this.#store.selectSignal(selectMe);

  community = input<Community>();
  isJoined = linkedSignal(() => this.community()?.isJoined);
  subscribersAmount = linkedSignal(
    () => this.community()?.subscribersAmount ?? 0
  );

  joinCommunity(communityId: number) {
    firstValueFrom(this.#communitiesService.joinCommunity(communityId)).then(
      () => {
        this.isJoined.set(true);
        this.subscribersAmount.update((count) => count + 1);
      }
    );
  }

  leaveCommunity(communityId: number) {
    firstValueFrom(this.#communitiesService.leaveCommunity(communityId)).then(
      () => {
        this.isJoined.set(false);
        this.subscribersAmount.update((count) => count - 1);
      }
    );
  }
}
