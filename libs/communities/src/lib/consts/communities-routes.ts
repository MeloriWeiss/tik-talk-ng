import { Routes } from '@angular/router';
import { CommunitiesSearchPageComponent } from '../feature-communities-list';
import { CommunityPageComponent } from '../feature-community-page/community-page/community-page.component';
import { provideState } from '@ngrx/store';
import {
  CommunitiesEffects,
  communitiesFeature,
} from '@tt/data-access/communities/store';
import { provideEffects } from '@ngrx/effects';

export const communitiesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: CommunitiesSearchPageComponent,
      },
      {
        path: ':id',
        component: CommunityPageComponent,
      },
    ],
    providers: [
      provideState(communitiesFeature),
      provideEffects(CommunitiesEffects),
    ],
  },
];
