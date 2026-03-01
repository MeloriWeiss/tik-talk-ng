import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  OnInit,
  Signal,
  untracked,
  viewChild,
} from '@angular/core';
import { CommentComponent } from '../../ui';
import {
  AvatarCircleComponent,
  DateDiffPipe,
  HtmlLinkClickDirective,
  SanitizePipe,
  SvgIconComponent,
} from '@tt/common-ui';
import {
  BasePostAuthor,
  Post,
  PostComment,
  postsActions,
  selectCommentsByPostId,
} from '@tt/data-access/posts';
import { MessageInputComponent } from '@tt/shared';
import { Store } from '@ngrx/store';
import { selectMe } from '@tt/data-access/profile';

@Component({
  selector: 'tt-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    CommentComponent,
    DateDiffPipe,
    MessageInputComponent,
    SanitizePipe,
    HtmlLinkClickDirective,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit, AfterViewInit {
  #store = inject(Store);
  #injector = inject(Injector);

  profile = this.#store.selectSignal(selectMe);

  post = input.required<Post<BasePostAuthor>>();
  defaultAvatarUrl = input<string | null>(null);

  comms!: Signal<PostComment[]>;

  comments = computed(() => {
    const comms = this.comms();

    if (comms && comms.length > 0) {
      return comms;
    }
    return this.post()?.comments;
  });

  commentsContainer = viewChild.required<ElementRef>('commentsContainer');

  ngOnInit() {
    this.comms = this.#store.selectSignal(
      selectCommentsByPostId(this.post().id)
    );
  }

  ngAfterViewInit() {
    effect(
      () => {
        this.comments();
        const commentsContainer = untracked(() => this.commentsContainer());

        requestAnimationFrame(() => {
          commentsContainer.nativeElement.scrollTop =
            commentsContainer.nativeElement.scrollHeight;
        });
      },
      { injector: this.#injector }
    );
  }

  async onCreatedComment(text: string) {
    const profile = this.profile();

    if (!profile) {
      return;
    }

    this.#store.dispatch(
      postsActions.createComment({
        payload: {
          text: text,
          authorId: profile.id,
          postId: this.post().id,
        },
      })
    );
  }
}
