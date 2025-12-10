import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import { firstValueFrom } from 'rxjs';
import { CommunitiesService } from '@tt/data-access/communities';

@Component({
  selector: 'tt-subscribe-btn',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './subscribe-btn.component.html',
  styleUrl: './subscribe-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribeBtnComponent {
  #communitiesService = inject(CommunitiesService);

  isJoined = input.required<boolean>();
  communityId = input.required<number>();

  changeJoinStatus = output<boolean>();

  joinCommunity() {
    firstValueFrom(
      this.#communitiesService.joinCommunity(this.communityId())
    ).then(() => {
      this.changeJoinStatus.emit(true);
    });
  }

  leaveCommunity() {
    firstValueFrom(
      this.#communitiesService.leaveCommunity(this.communityId())
    ).then(() => {
      this.changeJoinStatus.emit(false);
    });
  }
}
