import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import {
  InfiniteScrollTriggerComponent,
  LoaderComponent,
  ScrollBlockDirective,
} from '@tt/common-ui';
import { Store } from '@ngrx/store';
import {
  communitiesActions,
  selectFilteredCommunities,
  selectTotalCommunitiesCount,
} from '@tt/data-access/communities/store';
import { CommunityCardComponent } from '../../ui/index';

@Component({
  selector: 'tt-communities-list',
  imports: [
    InfiniteScrollTriggerComponent,
    LoaderComponent,
    ScrollBlockDirective,
    CommunityCardComponent,
  ],
  templateUrl: './communities-list.component.html',
  styleUrl: './communities-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesListComponent implements OnDestroy {
  #store = inject(Store);

  communities = this.#store.selectSignal(selectFilteredCommunities);
  totalCount = this.#store.selectSignal(selectTotalCommunitiesCount);

  fetchCommunities() {
    this.#store.dispatch(communitiesActions.setPage({}));
  }

  ngOnDestroy() {
    this.#store.dispatch(communitiesActions.resetCommunities());
  }
}
