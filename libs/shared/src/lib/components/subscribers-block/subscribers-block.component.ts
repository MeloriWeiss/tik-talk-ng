import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { SubscriberCircleComponent } from './subscriber-circle/subscriber-circle.component';
import { Pageable } from '@tt/data-access/shared';
import { Profile } from '@tt/data-access/profile';

@Component({
  selector: 'tt-subscribers-block',
  imports: [SubscriberCircleComponent],
  templateUrl: './subscribers-block.component.html',
  styleUrl: './subscribers-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribersBlockComponent {
  subscribers = input.required<Pageable<Profile> | null>();

  addSubscribers = output<void>();

  onAddSubscribers() {
    this.addSubscribers.emit();
  }
}
