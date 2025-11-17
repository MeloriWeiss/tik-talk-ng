import {
  ChangeDetectionStrategy,
  Component, computed,
  inject, Signal,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter, switchMap } from 'rxjs';
import {LabeledTagsComponent, LabeledTextComponent, ScrollBlockDirective } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { PostFeedComponent } from '@tt/posts';
import { ProfileHeaderComponent } from '../../ui';
import { ProfileService, selectMe } from '@tt/data-access/profile';
import { Store } from '@ngrx/store';
import { SubscribersBlockComponent } from '@tt/shared';
import {
  BasePostAuthor,
  Post,
  postsActions,
  selectPosts,
} from '@tt/data-access/posts';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

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
    SubscribersBlockComponent,
    LabeledTagsComponent,
    LabeledTextComponent,
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

  me = this.#store.selectSignal(selectMe);
  feed = this.#store.selectSignal(selectPosts);

  posts: Signal<Post<BasePostAuthor>[]> = computed(() => {
    return this.feed().map((post) => {
      const author = post.author;

      return {
        ...post,
        author: {
          id: author.id,
          admin: author,
          name: author.firstName + ' ' + author.lastName,
          avatarUrl: author.avatarUrl,
        },
      };
    });
  });

  me$ = toObservable(this.me);

  isMyPage = signal(false);

  subscribers$ = this.#profileService.getSubscribers(6);

  profile$ = this.me$.pipe(
    filter((me) => !!me),
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

  constructor() {
    this.#activatedRoute.params
      .pipe(takeUntilDestroyed())
      .subscribe(({ id }) => {
        return this.#store.dispatch(
          postsActions.fetchPosts(id === 'me' ? {} : { userId: id })
        );
      });
  }

  async sendMessage(userId: number) {
    this.#router
      .navigate(['/chats', 'new'], { queryParams: { userId } })
      .then();
  }

  createPost(text: string) {
    const me = this.me();

    if (!me) {
      return;
    }

    this.#store.dispatch(
      postsActions.createPost({
        payload: {
          title: '',
          content: text,
          authorId: me.id,
        },
      })
    );
  }
}
