import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { Community } from '@tt/data-access/communities';
import { AvatarCircleComponent, EndingMasculineWordPipe, SvgIconComponent } from '@tt/common-ui';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectMe } from '@tt/data-access/profile';
import { SubscribeBtnComponent } from '../subscribe-btn/subscribe-btn.component';

@Component({
  selector: 'tt-community-card',
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    RouterLink,
    EndingMasculineWordPipe,
    SubscribeBtnComponent,
  ],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardComponent {
  #store = inject(Store);

  me = this.#store.selectSignal(selectMe);

  community = input<Community>();
  isJoined = linkedSignal(() => Boolean(this.community()?.isJoined));
  subscribersAmount = linkedSignal(
    () => this.community()?.subscribersAmount ?? 0
  );

  changeJoinStatus(status: boolean) {
    this.isJoined.set(status);
    this.subscribersAmount.update((count) => status ? count + 1 : count - 1);
  }
}
