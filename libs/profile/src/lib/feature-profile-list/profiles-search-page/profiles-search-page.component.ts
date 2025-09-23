import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { ProfilesListComponent } from '../profiles-list/profiles-list.component';

@Component({
  selector: 'tt-profiles-search-page',
  standalone: true,
  imports: [
    ProfileFiltersComponent,
    ProfilesListComponent,
  ],
  templateUrl: './profiles-search-page.component.html',
  styleUrl: './profiles-search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilesSearchPageComponent {
}
