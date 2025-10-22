import { Community } from '../interfaces/communities.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { communitiesActions } from './actions';
import { Post } from '../../posts/index';

export interface CommunitiesState {
  communities: Community[];
  communitiesFilters: Record<string, any>;
  page: number;
  size: number;
  totalCommunitiesCount: number;
  posts: Post<Community>[];
}

const initialState: CommunitiesState = {
  communities: [],
  communitiesFilters: {},
  page: 1,
  size: 10,
  totalCommunitiesCount: 0,
  posts: [],
};

export const communitiesFeature = createFeature({
  name: 'communitiesFeature',
  reducer: createReducer(
    initialState,
    on(communitiesActions.filterCommunities, (state, { filters }) => {
      return {
        ...state,
        communitiesFilters: filters,
        page: 1,
        communities: [],
      };
    }),
    on(
      communitiesActions.communitiesLoaded,
      (state, { communities, totalCommunitiesCount }) => {
        return {
          ...state,
          totalCommunitiesCount,
          communities: state.communities.concat(communities),
        };
      }
    ),
    on(communitiesActions.setPage, (state, { page }) => {
      return {
        ...state,
        page: page ?? state.page + 1,
      };
    }),
    on(communitiesActions.resetCommunities, (state, _) => {
      return {
        ...state,
        communities: [],
        page: 1,
      };
    }),
    on(communitiesActions.communityCreated, (state, { community }) => {
      return {
        ...state,
        communities: [community, ...state.communities],
      };
    }),
    on(communitiesActions.postsLoaded, (state, { posts }) => {
      return {
        ...state,
        posts: posts
      };
    }),
    on(communitiesActions.postLoaded, (state, { post }) => {
      return {
        ...state,
        posts: [post, ...state.posts],
      };
    })
  ),
});
