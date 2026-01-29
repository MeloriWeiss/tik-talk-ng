import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AvatarCircleComponent, ChangePhotoTooltipComponent, EditableAvatarCircleComponent } from '@tt/common-ui';
import { Profile, ProfileService } from '@tt/data-access/profile';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'tt-profile-header',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    EditableAvatarCircleComponent,
    ChangePhotoTooltipComponent,
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  #profileService = inject(ProfileService);

  profile = input<Profile>();
  isMyPage = input(false);

  onFileLoaded(file: File) {
    firstValueFrom(this.#profileService.uploadAvatar(file)).then();
  }
}
