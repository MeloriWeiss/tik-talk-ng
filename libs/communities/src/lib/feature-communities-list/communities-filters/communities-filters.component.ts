import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BadgesInputComponent,
  LabeledFormFieldWrapperComponent, SvgIconComponent, TtFormInputComponent,
} from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { debounceTime, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  communitiesActions,
  selectCommunitiesFilters,
} from '@tt/data-access/communities/store';
import { MultiSelectComponent, MultiSelectOptionComponent, prepareSearchFormValue } from '@tt/shared';
import { communitiesThemes } from '../../consts/index';

@Component({
  selector: 'tt-communities-filters',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LabeledFormFieldWrapperComponent,
    BadgesInputComponent,
    MultiSelectComponent,
    SvgIconComponent,
    TtFormInputComponent,
    MultiSelectOptionComponent,
  ],
  templateUrl: './communities-filters.component.html',
  styleUrl: './communities-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesFiltersComponent {
  #fb = inject(FormBuilder);
  #store = inject(Store);

  communitiesThemes = communitiesThemes;

  searchForm = this.#fb.group({
    name: [''],
    theme: [[] as string[]],
    tags: [[] as string[]],
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
          communitiesActions.filterCommunities({ filters: formFilters })
        );
      });

    this.searchForm.patchValue(
      this.#store.selectSignal(selectCommunitiesFilters)()
    );
  }
}
