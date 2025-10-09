import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { postsActions, selectPosts } from '@tt/data-access/posts';
import { Store } from '@ngrx/store';
import { selectMe } from '@tt/data-access/profile';
import { MessageInputComponent } from '@tt/shared';
import { PostComponent } from '../post/post.component';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-post-feed',
  standalone: true,
  imports: [MessageInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent {
  #store = inject(Store);
  #activatedRoute = inject(ActivatedRoute);

  feed = this.#store.selectSignal(selectPosts);
  me = this.#store.selectSignal(selectMe);

  constructor() {
    this.#activatedRoute.params
      .pipe(takeUntilDestroyed())
      .subscribe(({ id }) => {
        return this.#store.dispatch(
          postsActions.fetchPosts(id === 'me' ? {} : { userId: id })
        );
      });
  }

  onCreatePost(text: string) {
    const me = this.me();

    if (!me) {
      return;
    }

    this.#store.dispatch(
      postsActions.createPost({
        payload: {
          title: 'Клёвый пост',
          content: text,
          authorId: me.id,
        },
      })
    );
  }
}
