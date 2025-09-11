import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { ProfileCardComponent } from '../../ui/index';
import {
  InfiniteScrollTriggerComponent,
  LoaderComponent,
  ScrollBlockDirective, SidebarPortalComponent, SidebarPortalService
} from '@tt/common-ui';
import {
  profileActions,
  selectFilteredProfiles,
  selectTotalProfilesCount,
} from '@tt/data-access/profile';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tt-infinite-scroll-profiles-list',
  imports: [
    ProfileCardComponent,
    ProfileCardComponent,
    LoaderComponent,
    ScrollBlockDirective,
    InfiniteScrollTriggerComponent,
    SidebarPortalComponent,
  ],
  templateUrl: './infinite-scroll-profiles-list.component.html',
  styleUrl: './infinite-scroll-profiles-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollProfilesListComponent implements OnDestroy {
  #store = inject(Store);
  #sidebarPortalService = inject(SidebarPortalService);

  profiles = this.#store.selectSignal(selectFilteredProfiles);
  totalCount = this.#store.selectSignal(selectTotalProfilesCount);

  fetchProfiles() {
    this.#store.dispatch(profileActions.setPage({}));
  }

  // onIntersection(entries: IntersectionObserverEntry[]) {
  //   if (!entries.length) {
  //     return;
  //   }
  //
  //   if (entries[0].intersectionRatio > 0) {
  //     this.fetchProfiles();
  //   }
  // }

  // scrollActionDebounceTrigger_ngxScroll$ = new Subject<null>();
  // constructor() {
  //   this.scrollActionDebounceTrigger_ngxScroll$
  //     .pipe(debounceTime(1000), takeUntilDestroyed())
  //     .subscribe(() => {
  //       this.fetchProfiles();
  //     });
  // }
  // onScroll() {
  //   this.scrollActionDebounceTrigger_ngxScroll$.next(null);
  // }

  ngOnDestroy() {
    this.#store.dispatch(profileActions.resetProfiles());
    this.#sidebarPortalService.destroy();
  }
}
