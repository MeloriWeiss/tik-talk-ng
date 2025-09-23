import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommunitiesFiltersComponent } from '../communities-filters/communities-filters.component';
import { CommunitiesHeaderComponent } from '../communities-header/communities-header.component';
import { CommunitiesListComponent } from '../communities-list/communities-list.component';

@Component({
  selector: 'tt-search-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommunitiesFiltersComponent,
    CommunitiesListComponent,
    CommunitiesHeaderComponent,
  ],
  templateUrl: './communities-search-page.component.html',
  styleUrl: './communities-search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesSearchPageComponent {}
