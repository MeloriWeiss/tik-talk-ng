import { Routes } from '@angular/router';
import { CommunitiesSearchPageComponent } from '../feature-communities-list';
import { CommunityPageComponent } from '../feature-community-page/community-page/community-page.component';
import { CommunitiesStoreFacade } from '@tt/data-access/communities/services/communities-store-facade.service';

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
      },
    ],
    providers: [CommunitiesStoreFacade],
  },
];
