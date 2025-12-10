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

export const selectCommunity = createSelector(
  communitiesFeature.selectCommunity,
  (community) => community
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

export const selectCommunityPosts = createSelector(
  communitiesFeature.selectPosts,
  (posts) => posts
);
