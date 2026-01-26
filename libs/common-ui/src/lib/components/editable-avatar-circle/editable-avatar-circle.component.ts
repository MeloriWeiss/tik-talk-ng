import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { AvatarCircleComponent, PortalComponent } from '../index';
import {
  CommunityImageType,
  selectCommunity,
} from '@tt/data-access/communities';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { CommunitiesStoreFacade } from '@tt/data-access/communities/services';

@Component({
  selector: 'tt-editable-avatar-circle',
  imports: [PortalComponent],
  templateUrl: './editable-avatar-circle.component.html',
  styleUrl: './editable-avatar-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableAvatarCircleComponent {
  #store = inject(Store);
  #communitiesStoreFacade = inject(CommunitiesStoreFacade);

  #community = this.#store.selectSignal(selectCommunity);

  avatarCircle = contentChild(AvatarCircleComponent);

  isMouseOver = signal(false);

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isMouseOver.set(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isMouseOver.set(false);
  }

  onUploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      this.avatarCircle()?.resultAvatarUrl.set(
        event.target?.result?.toString() ?? ''
      );

      const community = this.#community();

      if (!community) return;

      firstValueFrom(
        this.#communitiesStoreFacade.uploadImage({
          community_id: community.id,
          image_type: CommunityImageType.AVATAR,
          image_file: file,
        })
      ).then();
    };

    reader.readAsDataURL(file);
  }
}
