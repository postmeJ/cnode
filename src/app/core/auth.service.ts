import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { ReplaySubject, Observable } from 'rxjs/Rx';
import { Auth, REDIRECT_URL } from '../domain/entities';

@Injectable()
export class AuthService {
  auth: Auth = { hasError: true, redirectUrl: '', errMsg: 'not logged in' };
  redirectUrl: string = localStorage.getItem(REDIRECT_URL);
  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);
  constructor(private http: Http, @Inject('user') private userService) {
  }
  getAuth(): Observable<Auth> {
    return this.subject.asObservable();
  }
  unAuth(): void {
    this.auth = Object.assign(
      {},
      this.auth,
      { user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in' });
    this.subject.next(this.auth);
  }
  loginWithCredentials(accessToken: string): Observable<Auth> {
    return this.userService
      .findUser(accessToken)
      .map(user => {
        let auth = new Auth();
        if (null === user) {
          auth.user = null;
          auth.hasError = true;
          auth.errMsg = '用户不存在';
        } else {
          auth.user = user;
          auth.hasError = false;
          auth.errMsg = null;
          auth.redirectUrl = this.redirectUrl;
        }
        this.auth = Object.assign({}, auth);
        this.subject.next(this.auth);
        return this.auth;
      });
  }
}