import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { Profile } from '@tt/data-access/profile';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tt-profile-card',
  standalone: true,
  imports: [AvatarCircleComponent, RouterLink, SvgIconComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  profile = input<Profile>();
}
