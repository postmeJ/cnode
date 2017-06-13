import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate,
  Route
} from '@angular/router';
import { AUTH_TOKEN_KEY, REDIRECT_URL, USER_INFO_KEY, CanComponentDeactivate } from '../domain/entities';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad, CanActivateChild, CanDeactivate<CanComponentDeactivate> {
  private _authToken: string;

  set authToken(authToken) {
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    this._authToken = authToken;
  }
  get authToken(): string {
    this._authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return this._authToken;
  }

  private _userInfo: any;
  get userInfo() {
    return this._userInfo = sessionStorage.getItem(USER_INFO_KEY)
  }

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }
  canLoad(route: Route): boolean {
    return this.checkLogin();
  }
  checkLogin(url?: string): boolean {
    if (this.authToken && this.userInfo != null) {
      return true;
    }

    localStorage.setItem(REDIRECT_URL, url);
    this.router.navigate(['/login'])
    return false;
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}