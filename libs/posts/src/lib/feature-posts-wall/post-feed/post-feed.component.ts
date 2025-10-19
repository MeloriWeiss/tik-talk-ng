import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { BasePostAuthor, Post } from '@tt/data-access/posts';
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
  posts = input.required<Post<BasePostAuthor>[]>();
  canCreatePosts = input(true);

  avatarUrl = input<string | null>(null);
  defaultAvatarUrl = input<string | null>(null);

  createdPost = output<string>();

  onCreatePost(text: string) {
    this.createdPost.emit(text);
  }
}
