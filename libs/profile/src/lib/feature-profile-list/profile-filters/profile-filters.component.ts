import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, first, map, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SvgIconComponent } from '@tt/common-ui';
import { ProfileHeaderComponent } from '../../ui/index';
import {
  profileActions,
  selectFilteredProfiles,
  selectProfileFilters,
} from '@tt/data-access/profile';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

interface Search {
  firstName: string;
  lastName: string;
  city: string;
  stack: string;
}

@Component({
  selector: 'tt-profile-filters',
  standalone: true,
  imports: [
    FormsModule,
    ProfileHeaderComponent,
    ReactiveFormsModule,
    SvgIconComponent,
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFiltersComponent {
  #fb = inject(FormBuilder);
  #store = inject(Store);

  searchForm = this.#fb.group({
    firstName: [''],
    lastName: [''],
    city: [''],
    stack: [''],
  });

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        map((formValue) => {
          return Object.entries(formValue)
            .filter(([_, value]) => {
              return (value?.length ?? 0) > 2;
            })
            .reduce((summaryFilters, [key, value]) => {
              return {
                ...summaryFilters,
                [key]: value,
              };
            }, {} as Search);
        }),
        takeUntilDestroyed()
      )
      .subscribe((formFilters) => {
        this.#store.dispatch(
          profileActions.filterProfiles({ filters: formFilters })
        );
      });

    this.searchForm.patchValue(
      this.#store.selectSignal(selectProfileFilters)(),
      {
        emitEvent: !this.#store.selectSignal(selectFilteredProfiles)().length,
      }
    );
  }
}
