import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { communitiesActions } from './actions';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectCommunitiesFilters,
  selectCommunitiesPageable,
} from './selectors';
import { CommunitiesService } from '../services/communities.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommunitiesEffects {
  #communitiesService = inject(CommunitiesService);
  #actions$ = inject(Actions);
  #store = inject(Store);
  #router = inject(Router)

  filterCommunities = createEffect(() => {
    return this.#actions$.pipe(
      ofType(communitiesActions.filterCommunities, communitiesActions.setPage),
      withLatestFrom(
        this.#store.select(selectCommunitiesFilters),
        this.#store.select(selectCommunitiesPageable)
      ),
      switchMap(([_, filters, pageable]) => {
        return this.#communitiesService.filterCommunities({
          ...pageable,
          ...filters,
        });
      }),
      map((res) => {
        return communitiesActions.communitiesLoaded({
          communities: res.items,
          totalCommunitiesCount: res.total,
        });
      })
    );
  });

  createCommunity = createEffect(() => {
    return this.#actions$.pipe(
      ofType(communitiesActions.createCommunity),
      switchMap(({ params }) => {
        return this.#communitiesService.createCommunity(params)
          .pipe(
            tap(community => {
              this.#router.navigate(['communities', community.id]).then()
            })
          );
      }),
      map((res) => {
        return communitiesActions.communityCreated({
          community: res,
        });
      })
    );
  });
}
