import { inject, Injectable } from '@angular/core';
import {
  ProfileService,
  selectProfileFilters,
  selectProfilePageable,
} from '../index';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  #profileService = inject(ProfileService);
  #actions$ = inject(Actions);
  #store = inject(Store);

  filterProfiles = createEffect(() => {
    return this.#actions$.pipe(
      ofType(profileActions.filterProfiles, profileActions.setPage),
      withLatestFrom(
        this.#store.select(selectProfileFilters),
        this.#store.select(selectProfilePageable)
      ),
      switchMap(([_, filters, pageable]) => {
        return this.#profileService.filterProfiles({
          ...pageable,
          ...filters,
        });
      }),
      map((res) =>
        profileActions.profilesLoaded({
          profiles: res.items,
          totalProfilesCount: res.total,
        })
      )
    );
  });

  getMe = createEffect(() => {
    return this.#actions$.pipe(
      ofType(profileActions.getMe),
      switchMap(() => {
        return this.#profileService.getMe();
      }),
      map((res) => profileActions.meLoaded({ me: res }))
    );
  });

  patchProfile = createEffect(() => {
    return this.#actions$.pipe(
      ofType(profileActions.patchProfile),
      switchMap(({ profile }) => {
        return this.#profileService.patchProfile(profile);
      }),
      map((res) => profileActions.meLoaded({ me: res }))
    );
  });
}
