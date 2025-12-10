import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import { ModalService } from '@tt/common-ui';
import { CreateCommunityModalComponent } from '../../ui/index';
import {
  communitiesActions,
  OptionalCreateCommunityFormData,
} from '@tt/data-access/communities';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tt-communities-header',
  imports: [SvgIconComponent],
  templateUrl: './communities-header.component.html',
  styleUrl: './communities-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesHeaderComponent {
  #store = inject(Store);
  #modalService = inject(ModalService);

  async showModal() {
    const res = await firstValueFrom(
      this.#modalService.show<OptionalCreateCommunityFormData | false>(
        CreateCommunityModalComponent
      )
    );

    if (!res) return;

    this.#store.dispatch(
      communitiesActions.createCommunity({
        params: res,
      })
    );
  }
}
