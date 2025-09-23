import { createSelector } from '@ngrx/store';
import { communitiesFeature } from './reducer';

export const selectFilteredCommunities = createSelector(
  communitiesFeature.selectCommunities,
  (communities) => communities
);

export const selectTotalCommunitiesCount = createSelector(
  communitiesFeature.selectTotalCommunitiesCount,
  (totalCommunitiesCount) => totalCommunitiesCount
);

export const selectCommunitiesFilters = createSelector(
  communitiesFeature.selectCommunitiesFilters,
  (communitiesFilters) => communitiesFilters
);

export const selectCommunitiesPageable = createSelector(
  communitiesFeature.selectCommunitiesFeatureState,
  (state) => {
    return {
      page: state.page,
      size: state.size,
    };
  }
);
