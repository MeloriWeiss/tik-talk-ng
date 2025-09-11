import { Routes } from '@angular/router';
import { ChatsPageComponent } from './chats-page.component';

// const meResolver: ResolveFn<Profile[]> = () => {
//   console.log('meResolver');
//   return inject(ProfileService).getTestAccounts();
// };

export const chatsRoutes: Routes = [
  {
    path: '',
    component: ChatsPageComponent,
    // canActivateChild: [canActivateChild],
    // resolve: {
    //   me: meResolver,
    // },
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('../chat-workspace/chat-workspace.component').then(
            (c) => c.ChatWorkspaceComponent
          ),
        // runGuardsAndResolvers: 'pathParamsChange',
        // canActivate: [canActivate1],
        // resolve: {
        //   me: meResolver,
        //   me2: meResolver,
        //   me3: meResolver,
        // },
      },
    ],
  },
];
