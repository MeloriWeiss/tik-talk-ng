import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import { ModalService } from '@tt/common-ui';
import { CreateCommunityModalComponent } from '../../ui/index';

@Component({
  selector: 'tt-communities-header',
  imports: [SvgIconComponent],
  templateUrl: './communities-header.component.html',
  styleUrl: './communities-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesHeaderComponent {
  #modalService = inject(ModalService);

  showModal() {
    this.#modalService.show(CreateCommunityModalComponent);
  }
}
