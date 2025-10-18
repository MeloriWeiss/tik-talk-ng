import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { first, switchMap } from 'rxjs';
import { ScrollBlockDirective } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { PostFeedComponent } from '@tt/posts';
import { ProfileHeaderComponent } from '../../ui';
import { ProfileService, selectMe } from '@tt/data-access/profile';
import { Store } from '@ngrx/store';
import { SubscriberCircleComponent } from '../subscriber-circle/subscriber-circle.component';

@Component({
  selector: 'tt-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    SvgIconComponent,
    RouterLink,
    PostFeedComponent,
    ScrollBlockDirective,
    AsyncPipe,
    SubscriberCircleComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  #profileService = inject(ProfileService);
  #store = inject(Store);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  me$ = this.#store.select(selectMe);
  subscribers$ = this.#profileService.getSubscribersShortList(6);

  isMyPage = signal(false);

  profile$ = this.me$.pipe(
    first(),
    switchMap((me) => {
      return this.#activatedRoute.params.pipe(
        switchMap(({ id }) => {
          this.isMyPage.set(id === 'me' || Number(id) === me?.id);

          if (this.isMyPage()) {
            return this.me$;
          }
          return this.#profileService.getAccount(id);
        })
      );
    })
  );

  async sendMessage(userId: number) {
    this.#router
      .navigate(['/chats', 'new'], { queryParams: { userId } })
      .then();
  }
}
