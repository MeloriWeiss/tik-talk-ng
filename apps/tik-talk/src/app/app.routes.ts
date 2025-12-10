import { Routes } from '@angular/router';
import { canActivateAuth, canDeactivate, LoginPageComponent } from '@tt/auth';
import {
  ProfilePageComponent,
  ProfilesSearchPageComponent,
  SettingsPageComponent,
} from '@tt/profile';
import { LayoutComponent } from '@tt/layout';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProfileEffects, profileFeature } from '@tt/data-access/profile';
import { PostsEffects, postsFeature } from '@tt/data-access/posts';
import { ChatsEffects, chatsFeature } from '@tt/data-access/chats';
import { ErrorComponent } from '@tt/common-ui';
import {
  ExperimentsComponent,
  ExpMyFormComponent,
  ExpRFormsComponent,
  ExpTdFormsComponent,
} from '@tt/experimental';
import {
  CommunitiesEffects,
  communitiesFeature,
} from '@tt/data-access/communities';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile/me',
        // redirectTo: (route) => {
        //   const router = inject(Router);
        //   return router.createUrlTree(['profile', 'me']);
        // },
        pathMatch: 'full',
      },
      // {
      //   component: SearchPageComponent,
      //   matcher: (segments: UrlSegment[]) => {
      //     if (segments.length === 2 && segments[0].path === 'profile') {
      //       const id = segments[1].path;
      //
      //       if (id.startsWith('1')) {
      //         return {
      //           consumed: segments,
      //           posParams: {
      //             id: segments[1]
      //           }
      //         }
      //       }
      //     }
      //     return null;
      //   }
      // },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
        canDeactivate: [canDeactivate],
      },
      { path: 'search', component: ProfilesSearchPageComponent },
      {
        path: 'chats',
        // canMatch: [canMatch],
        // canActivate: [
        // CanActivate1,
        // CanActivate2,
        // CanActivate3,
        // canActivate1,
        // canActivate2,
        // canActivate3
        // ],
        loadChildren: () => import('@tt/chats').then((m) => m.chatsRoutes),
        data: { preload: false },
      },
      {
        path: 'communities',
        loadChildren: () =>
          import('@tt/communities').then((m) => m.communitiesRoutes),
      },

      // {
      //   path: 'first',
      //   outlet: 'aside',
      //   component: Aside1Component,
      // },
      // {
      //   path: 'second',
      //   outlet: 'aside',
      //   component: Aside2Component,
      // },
      //
      // {
      //   path: 'first',
      //   outlet: 'pew',
      //   component: Aside1Component,
      // },
      // {
      //   path: 'second',
      //   outlet: 'pew',
      //   component: Aside2Component,
      // },
    ],
    providers: [
      provideState(profileFeature),
      provideState(chatsFeature),
      provideState(postsFeature),
      provideState(communitiesFeature),
      provideEffects([ProfileEffects, ChatsEffects, PostsEffects, CommunitiesEffects]),
    ],
    canActivate: [canActivateAuth],
    title: 'TikTalk',
  },
  { path: 'login', component: LoginPageComponent, title: 'TikTalk: вход' },

  {
    path: 'exp',
    children: [
      {
        path: 'forms',
        children: [
          { path: 'td', component: ExpTdFormsComponent },
          { path: 'r', component: ExpRFormsComponent },
          { path: 'my', component: ExpMyFormComponent },
        ],
      },
      { path: 'sandbox', component: ExperimentsComponent },
    ],
  },

  { path: '**', component: ErrorComponent },
];
