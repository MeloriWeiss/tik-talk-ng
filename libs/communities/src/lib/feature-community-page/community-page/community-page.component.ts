import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { CommunitiesService, Community } from '@tt/data-access/communities';
import { Store } from '@ngrx/store';
import { Profile, selectMe } from '@tt/data-access/profile';
import { filter, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  communitiesActions,
  selectCommunityPosts,
} from '@tt/data-access/communities/store';
import { Pageable } from '@tt/data-access/shared';
import { BasePostAuthor, Post } from '@tt/data-access/posts';

@Component({
  selector: 'tt-community-page',
  imports: [
    AsyncPipe,
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
  #activatedRoute = inject(ActivatedRoute);
  #communitiesService = inject(CommunitiesService);
  #store = inject(Store);
  #destroyRef = inject(DestroyRef);

  feed = this.#store.selectSignal(selectCommunityPosts);

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

  isMyCommunity = signal(false);
  isJoined = signal(false);
  subscribers = signal<Pageable<Profile> | null>(null);
  community = signal<Community | null>(null);

  community$ = this.#store.select(selectMe).pipe(
    filter((me) => !!me),
    switchMap((me) => {
      return this.#activatedRoute.params.pipe(
        switchMap(({ id }) => {
          return this.#communitiesService.getCommunity(id).pipe(
            tap((community) => {
              if (!me || !community) {
                return;
              }
              this.isMyCommunity.set(me.id === community.admin.id);
              this.isJoined.set(community.isJoined);
              this.community.set(community);
            })
          );
        })
      );
    })
  );

  constructor() {
    this.#activatedRoute.params
      .pipe(takeUntilDestroyed())
      .subscribe(({ id }) => {
        this.#store.dispatch(
          communitiesActions.fetchPosts({ communityId: id })
        );
      });

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
        .pipe(takeUntilDestroyed(this.#destroyRef))
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
