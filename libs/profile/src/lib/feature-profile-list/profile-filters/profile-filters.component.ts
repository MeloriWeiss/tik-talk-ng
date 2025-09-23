import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LabeledFormFieldWrapperComponent, SvgIconComponent, TtFormInputComponent } from '@tt/common-ui';
import { ProfileHeaderComponent } from '../../ui/index';
import { profileActions, selectProfileFilters } from '@tt/data-access/profile';
import { Store } from '@ngrx/store';
import { prepareSearchFormValue } from '@tt/shared';

@Component({
  selector: 'tt-profile-filters',
  standalone: true,
  imports: [
    FormsModule,
    ProfileHeaderComponent,
    ReactiveFormsModule,
    LabeledFormFieldWrapperComponent,
    SvgIconComponent,
    TtFormInputComponent,
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
        map(prepareSearchFormValue),
        takeUntilDestroyed()
      )
      .subscribe((formFilters) => {
        this.#store.dispatch(
          profileActions.filterProfiles({ filters: formFilters })
        );
      });

    this.searchForm.patchValue(
      this.#store.selectSignal(selectProfileFilters)()
    );
  }
}
