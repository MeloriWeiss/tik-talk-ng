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
  CommunityImageType,
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
  ChangePhotoTooltipComponent,
  EditableAvatarCircleComponent,
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
import {
  HasChanges,
  Pageable,
  TrackChangesService,
} from '@tt/data-access/shared';
import { BasePostAuthor, Post } from '@tt/data-access/posts';
import { firstValueFrom } from 'rxjs';
import { CommunitiesStoreFacade } from '@tt/data-access/communities/services';

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
    EditableAvatarCircleComponent,
    ChangePhotoTooltipComponent,
  ],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityPageComponent implements HasChanges {
  #communitiesService = inject(CommunitiesService);
  #communitiesStoreFacade = inject(CommunitiesStoreFacade);
  #store = inject(Store);
  #modalService = inject(ModalService);
  #trackChangesService = inject(TrackChangesService);

  defaultAvatarUrl = 'assets/svg/img-placeholder.svg';

  me = this.#store.selectSignal(selectMe);
  feed = this.#store.selectSignal(selectCommunityPosts);
  community = this.#store.selectSignal(selectCommunity);

  id = input<number>();

  posts: Signal<Post<BasePostAuthor>[]> = computed(() => {
    return this.feed().map((post) => {
      const author = post.author ?? this.community();

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

  subscribers = signal<Pageable<Profile> | null>(null);
  isMyCommunity = computed(() =>
    Boolean(this.me()?.id === this.community()?.admin.id)
  );
  isJoined = linkedSignal(() => Boolean(this.community()?.isJoined));

  get hasChanges() {
    return this.#trackChangesService.hasChanges;
  }

  constructor() {
    effect(() => {
      const id = this.id();
      const me = this.me();

      if (!id || !me) return;

      firstValueFrom(this.#communitiesStoreFacade.getCommunity(id)).then();
    });

    effect(() => {
      this.id();
      this.isJoined();
      const community = untracked(() => this.community());

      if (!community) return;

      firstValueFrom(
        this.#communitiesService.getSubscribers({
          communityId: community.id,
        })
      ).then((res) => {
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
      this.#modalService.show<OptionalCreateCommunityFormData | false>(
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

  onFileLoaded(file: File) {
    const community = this.community();

    if (!community) return;

    firstValueFrom(
      this.#communitiesStoreFacade.uploadImage({
        community_id: community.id,
        image_type: CommunityImageType.AVATAR,
        image_file: file,
      })
    ).then();
  }
}
