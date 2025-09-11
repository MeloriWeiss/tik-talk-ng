import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { InfiniteScrollProfilesListComponent } from '../infinite-scroll-profiles-list/infinite-scroll-profiles-list.component';

@Component({
  selector: 'tt-search-page',
  standalone: true,
  imports: [
    ProfileFiltersComponent,
    InfiniteScrollProfilesListComponent,
    InfiniteScrollProfilesListComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
}
