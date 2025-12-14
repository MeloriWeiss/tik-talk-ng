import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  Signal,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  LabeledTagsComponent,
  LabeledTextComponent,
  ScrollBlockDirective,
} from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { PostFeedComponent } from '@tt/posts';
import { ProfileHeaderComponent } from '../../ui';
import { Profile, ProfileService, selectMe } from '@tt/data-access/profile';
import { Store } from '@ngrx/store';
import { SubscribersBlockComponent } from '@tt/shared';
import {
  BasePostAuthor,
  Post,
  postsActions,
  selectPosts,
} from '@tt/data-access/posts';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Pageable } from '@tt/data-access/shared';

@Component({
  selector: 'tt-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    SvgIconComponent,
    RouterLink,
    PostFeedComponent,
    ScrollBlockDirective,
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
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);

  me = this.#store.selectSignal(selectMe);
  feed = this.#store.selectSignal(selectPosts);

  id = input<number | string>();

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
  subscribers = signal<Pageable<Profile> | null>(null);

  profile = signal<Profile | null>(null);

  constructor() {
    effect(() => {
      const id = this.id();

      if (!id) return;

      this.#store.dispatch(
        postsActions.fetchPosts(id === 'me' ? {} : { userId: +id })
      );

      const me = this.me();

      if (!me) return;

      this.#profileService
        .getSubscribers({
          account_id: id === 'me' ? me.id : +id,
          size: 6,
        })
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe((subscribers) => {
          this.subscribers.set(subscribers);
        });

      this.isMyPage.set(id === 'me' || Number(id) === me?.id);

      if (this.isMyPage()) {
        return this.profile.set(me);
      }
      this.#profileService
        .getAccount(+id)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe((profile) => {
          this.profile.set(profile);
        });
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

  onAddSubscribers() {
    this.#router.navigate(['search']).then();
  }
}
