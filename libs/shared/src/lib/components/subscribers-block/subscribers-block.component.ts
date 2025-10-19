import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubscriberCircleComponent } from './subscriber-circle/subscriber-circle.component';
import { Pageable } from '@tt/data-access/shared';
import { Profile } from '@tt/data-access/profile';

@Component({
  selector: 'tt-subscribers-block',
  imports: [SubscriberCircleComponent, RouterLink],
  templateUrl: './subscribers-block.component.html',
  styleUrl: './subscribers-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribersBlockComponent {
  subscribers = input.required<Pageable<Profile> | null>();
}
