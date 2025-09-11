import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { postsActions, selectPosts } from '@tt/data-access/posts';
import { Store } from '@ngrx/store';
import { selectMe } from '@tt/data-access/profile';
import { MessageInputComponent } from '@tt/shared';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'tt-post-feed',
  standalone: true,
  imports: [MessageInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent {
  store = inject(Store);

  feed = this.store.selectSignal(selectPosts);
  profile = this.store.selectSignal(selectMe);

  constructor() {
    this.store.dispatch(postsActions.fetchPosts());
  }

  onCreatePost(text: string) {
    this.store.dispatch(
      postsActions.createPost({
        payload: {
          title: 'Клёвый пост',
          content: text,
          authorId: this.profile()!.id,
        },
      })
    );
  }
}
