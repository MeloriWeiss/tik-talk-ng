import { Routes } from '@angular/router';
import { CommunitiesSearchPageComponent } from '../feature-communities-list';
import { CommunityPageComponent } from '../feature-community-page/community-page/community-page.component';

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
  },
];
