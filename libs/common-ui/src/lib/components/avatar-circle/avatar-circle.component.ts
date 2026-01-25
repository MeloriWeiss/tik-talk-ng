import { ChangeDetectionStrategy, Component, input, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'tt-avatar-circle',
  standalone: true,
  imports: [],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarCircleComponent {
  avatarUrl = input<string | null | undefined>();
  defaultAvatarUrl = input<string | null | undefined>();

  resultAvatarUrl = linkedSignal(() => {
    if (this.avatarUrl()) return `/yt-course/${this.avatarUrl()}`;

    return this.defaultAvatarUrl() ?? 'assets/svg/avatar-placeholder.svg';
  });
}
