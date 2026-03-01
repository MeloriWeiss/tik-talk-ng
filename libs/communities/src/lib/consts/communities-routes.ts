import { Routes } from '@angular/router';
import { CommunitiesSearchPageComponent } from '../feature-communities-list';
import { CommunityPageComponent } from '../feature-community-page/community-page/community-page.component';
import { CommunitiesStoreFacade } from '@tt/data-access/communities/services/communities-store-facade.service';
import { canDeactivateWithConfirm } from '@tt/shared';
import { provideState } from '@ngrx/store';
import { PostsEffects, postsFeature } from '@tt/data-access/posts';
import { provideEffects } from '@ngrx/effects';

export const communitiesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: CommunitiesSearchPageComponent,
      },
      {
        path: ':id',
        component: CommunityPageComponent,
        canDeactivate: [canDeactivateWithConfirm],
      },
    ],
    providers: [
      CommunitiesStoreFacade,
      provideState(postsFeature),
      provideEffects([PostsEffects]),
    ],
  },
];
