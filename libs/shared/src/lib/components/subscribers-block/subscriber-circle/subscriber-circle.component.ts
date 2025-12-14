import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  inject,
  input, output,
  signal,
} from '@angular/core';
import { Profile } from '@tt/data-access/profile';
import { AvatarCircleComponent, PortalComponent } from '@tt/common-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'tt-subscriber-circle',
  imports: [
    AvatarCircleComponent,
    PortalComponent,
  ],
  templateUrl: './subscriber-circle.component.html',
  styleUrl: './subscriber-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriberCircleComponent {
  #router = inject(Router);

  subscriber = input.required<Profile>();
  selectable = input(false);
  selected = signal(false);

  isMouseOver = signal(false);

  selectSubscriber = output<number | null>();

  @HostListener('mouseover')
  onMouseOver() {
    this.isMouseOver.set(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isMouseOver.set(false);
  }

  @HostBinding('class.selected')
  get isSubscriberSelected() {
    return this.selected();
  }

  onAvatarClick() {
    const subscriberId = this.subscriber().id;

    if (this.selectable()) {
      this.selected.set(!this.selected());

      if (!this.selected()) {
        return this.selectSubscriber.emit(null);
      }

      return this.selectSubscriber.emit(subscriberId);
    }

    this.#router.navigate(['profile', subscriberId]).then();
  }
}
