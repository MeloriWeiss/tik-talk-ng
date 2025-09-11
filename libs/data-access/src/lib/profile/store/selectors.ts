import { createSelector } from '@ngrx/store';
import { profileFeature } from './reducer';

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => profiles
);

export const selectTotalProfilesCount = createSelector(
  profileFeature.selectTotalProfilesCount,
  (totalProfilesCount) => totalProfilesCount
);

export const selectProfileFilters = createSelector(
  profileFeature.selectProfileFilters,
  (filters) => filters
);

export const selectMe = createSelector(profileFeature.selectMe, (me) => me);

export const selectProfilePageable = createSelector(
  profileFeature.selectProfileFeatureState,
  (state) => {
    return {
      page: state.page,
      size: state.size,
    };
  }
);
