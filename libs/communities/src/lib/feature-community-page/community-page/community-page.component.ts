import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  Signal,
  signal,
} from '@angular/core';
import { CommunitiesService, Community } from '@tt/data-access/communities';
import { Store } from '@ngrx/store';
import { Profile, selectMe } from '@tt/data-access/profile';
import {
  CommunityBannerComponent,
  SubscribeBtnComponent,
} from '../../ui/index';
import {
  AvatarCircleComponent,
  LabeledTagsComponent,
  LabeledTextComponent,
  ScrollBlockDirective,
  SvgIconComponent,
} from '@tt/common-ui';
import { SubscribersBlockComponent } from '@tt/shared';
import { PostFeedComponent } from '@tt/posts';
import {
  communitiesActions,
  selectCommunityPosts,
} from '@tt/data-access/communities/store';
import { Pageable } from '@tt/data-access/shared';
import { BasePostAuthor, Post, postsActions } from '@tt/data-access/posts';

@Component({
  selector: 'tt-community-page',
  imports: [
    CommunityBannerComponent,
    AvatarCircleComponent,
    SvgIconComponent,
    SubscribeBtnComponent,
    SubscribersBlockComponent,
    LabeledTagsComponent,
    LabeledTextComponent,
    PostFeedComponent,
    ScrollBlockDirective,
  ],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityPageComponent {
  #communitiesService = inject(CommunitiesService);
  #store = inject(Store);

  me = this.#store.selectSignal(selectMe);
  feed = this.#store.selectSignal(selectCommunityPosts);

  id = input<number>();

  posts: Signal<Post<BasePostAuthor>[]> = computed(() => {
    return this.feed().map((post) => {
      const author = post.author;

      return {
        ...post,
        author: {
          id: author.id,
          admin: author.admin,
          name: author.name,
          avatarUrl: author.avatarUrl,
        },
      };
    });
  });

  community = signal<Community | null>(null);
  subscribers = signal<Pageable<Profile> | null>(null);
  isMyCommunity = computed(() =>
    Boolean(this.me()?.id === this.community()?.admin.id)
  );
  isJoined = linkedSignal(() => Boolean(this.community()?.isJoined));

  // community$ = this.#store.select(selectMe).pipe(
  //   filter((me) => !!me),
  //   switchMap((me) => {
  //     return this.#activatedRoute.params.pipe(
  //       switchMap(({ id }) => {
  //         return this.#communitiesService.getCommunity(id).pipe(
  //           tap((community) => {
  //             if (!me || !community) {
  //               return;
  //             }
  //             this.community.set(community);
  //           })
  //         );
  //       })
  //     );
  //   })
  // );

  constructor() {
    effect(() => {
      const id = this.id();
      const me = this.me();

      if (!id || !me) {
        return;
      }

      return this.#communitiesService
        .getCommunity(id)
        .subscribe((community) => {
          this.community.set(community);
          this.#store.dispatch(
            communitiesActions.postsLoaded({ posts: community.posts })
          );
        });
    });
    // this.#activatedRoute.params
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(({ id }) => {
    //     this.#store.dispatch(
    //       communitiesActions.fetchPosts({ communityId: id })
    //     );
    //   });

    effect(() => {
      this.isJoined();
      const community = this.community();

      if (!community) {
        return;
      }

      this.#communitiesService
        .getSubscribers({
          communityId: community.id,
        })
        .subscribe((res) => {
          this.subscribers.set(res);
        });
    });
  }

  changeJoinStatus(status: boolean) {
    this.isJoined.set(status);
  }

  createPost(text: string) {
    const community = this.community();

    if (!community) {
      return;
    }

    this.#store.dispatch(
      communitiesActions.createPost({
        community: community,
        payload: {
          title: '',
          content: text,
          communityId: community.id,
        },
      })
    );
  }
}
