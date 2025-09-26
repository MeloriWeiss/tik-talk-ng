import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  CanMatchFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@tt/data-access/auth';
import { Route, UrlSegment } from '@angular/router';
import { map, timer } from 'rxjs';
import { HasChanges } from '@tt/data-access/shared';

export const canActivateAuth: CanActivateFn = () => {
  const isLoggedIn = inject(AuthService).isAuth;
  if (isLoggedIn) {
    return true;
  }
  return inject(Router).createUrlTree(['login']);
};

export const canActivateChild: CanActivateFn = (
  childRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return true;
};

export const canActivate1 = () => {
  console.log('canActivate1');
  return true;
};

export const canActivate2 = () => {
  console.log('canActivate2');
  return inject(Router).createUrlTree(['/settings']);
};

export const canActivate3 = () => {
  console.log('canActivate3');
  return timer(2000).pipe(map(() => false));
};

export const canMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return false;
};

@Injectable({
  providedIn: 'root',
})
export class CanActivate1 implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    console.log('canActivate1');
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class CanActivate2 implements CanActivate {
  #router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    console.log('canActivate1');
    return this.#router.createUrlTree(['/settings']);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CanActivate3 implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    console.log('canActivate1');
    return false;
  }
}

export const canDeactivate = (component: HasChanges) => {
  const allowGoAway = !component.hasChanges;

  if (!allowGoAway) {
    return confirm('Вы уверены?');
  }

  return allowGoAway;
};
