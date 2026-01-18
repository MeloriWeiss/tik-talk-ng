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
  untracked,
} from '@angular/core';
import {
  CommunitiesService,
  OptionalCreateCommunityFormData,
  selectCommunity,
} from '@tt/data-access/communities';
import { Store } from '@ngrx/store';
import { Profile, selectMe } from '@tt/data-access/profile';
import {
  CommunityBannerComponent,
  CreateCommunityModalComponent,
  ShareCommunityModalComponent,
  SubscribeBtnComponent,
} from '../../ui/index';
import {
  AvatarCircleComponent,
  LabeledTagsComponent,
  LabeledTextComponent,
  ModalService,
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
import { BasePostAuthor, Post } from '@tt/data-access/posts';
import { firstValueFrom } from 'rxjs';

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
  #modalService = inject(ModalService);

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

  community = this.#store.selectSignal(selectCommunity);
  subscribers = signal<Pageable<Profile> | null>(null);
  isMyCommunity = computed(() =>
    Boolean(this.me()?.id === this.community()?.admin.id)
  );
  isJoined = linkedSignal(() => Boolean(this.community()?.isJoined));

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
          this.#store.dispatch(
            communitiesActions.communityLoaded({ community })
          );
          this.#store.dispatch(
            communitiesActions.postsLoaded({ posts: community.posts })
          );
        });
    });

    effect(() => {
      this.isJoined();
      const community = untracked(() => this.community());

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

    if (!community) return;

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

  async openEditCommunityModal() {
    const community = this.community();

    if (!community) return;

    const res = await firstValueFrom(
      await this.#modalService.show<OptionalCreateCommunityFormData | false>(
        CreateCommunityModalComponent,
        {
          initialFormValue: {
            name: community.name,
            themes: community.themes,
            tags: community.tags,
            description: community.description,
          },
          deletable: true,
        }
      )
    );

    if (!res) return;

    this.#store.dispatch(
      communitiesActions.updateCommunity({
        communityId: community.id,
        payload: res,
      })
    );
  }

  shareCommunity() {
    this.#modalService.show(ShareCommunityModalComponent);
  }
}
