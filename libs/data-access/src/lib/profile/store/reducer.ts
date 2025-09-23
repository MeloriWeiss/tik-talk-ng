import { createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './actions';
import { Profile } from '../interfaces/profile.interface';

export interface ProfileState {
  profiles: Profile[];
  profileFilters: Record<string, any>;
  me: Profile | null;
  page: number;
  size: number;
  totalProfilesCount: number;
}

const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
  me: null,
  page: 1,
  size: 10,
  totalProfilesCount: 0,
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(
      profileActions.profilesLoaded,
      (state, { profiles, totalProfilesCount }) => {
        return {
          ...state,
          totalProfilesCount,
          profiles: state.profiles.concat(profiles),
        };
      }
    ),
    on(profileActions.filterProfiles, (state, { filters }) => {
      return {
        ...state,
        profiles: [],
        profileFilters: filters,
        page: 1,
      };
    }),
    on(profileActions.setPage, (state, { page }) => {
      return {
        ...state,
        page: page ?? state.page + 1,
      };
    }),
    on(profileActions.meLoaded, (state, { me }) => {
      return {
        ...state,
        me: me,
      };
    }),
    on(profileActions.resetProfiles, (state, _) => {
      return {
        ...state,
        profiles: [],
        page: 1,
      };
    })
  ),
});
