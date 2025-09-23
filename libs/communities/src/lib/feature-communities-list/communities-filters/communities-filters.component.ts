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
import { MultiSelectComponent, prepareSearchFormValue } from '@tt/shared';
import {communityThemes} from "./community-themes";

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
  ],
  templateUrl: './communities-filters.component.html',
  styleUrl: './communities-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesFiltersComponent {
  #fb = inject(FormBuilder);
  #store = inject(Store);

  communityThemes = communityThemes;

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
