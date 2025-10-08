import {
  ApplicationConfig,
  Injectable,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  PreloadingStrategy,
  provideRouter,
  Route,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { mergeMap, Observable, of, timer } from 'rxjs';
import { authTokenInterceptor } from '@tt/auth';

@Injectable({
  providedIn: 'root',
})
export class DelayedPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, loadFn: () => Observable<any>): Observable<any> {
    if (route.data && !route.data['preload']) {
      return of(null);
    }
    return timer(3000).pipe(mergeMap(() => loadFn()));
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    // provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      // withPreloading(DelayedPreloadingStrategy),
      // withDebugTracing(),
      // withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withComponentInputBinding(),
      // withHashLocation(),
      withViewTransitions(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        // onSameUrlNavigation: 'reload',
      })
    ),
    provideHttpClient(withInterceptors([authTokenInterceptor]), withFetch()),
    provideStore(),
    provideEffects(),
  ],
};
