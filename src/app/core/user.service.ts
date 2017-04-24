import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { User, BASE_API_URL, USER_INFO_KEY, UserDetails } from "../domain/entities"
import { Observable, Subject } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private api_url = BASE_API_URL;
  private subject: ReplaySubject<User> = new ReplaySubject<User>(1);
  private user: User;
  constructor(private http: Http) {
    let user = JSON.parse(sessionStorage.getItem(USER_INFO_KEY));
    this.subject.next(user);
    this.subject.complete(); //防止多次subject.next
  }

  findUser(accessToken: string): Observable<User> {
    return this.http.post(`${this.api_url}/accesstoken`, JSON.stringify({ accesstoken: accessToken }), { headers: this.headers }).map(res => {
      return res.json() as User;
    }).do(user => {
      sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
      this.subject.next(user);
      this.subject.complete();
    }).publishReplay(1)
      .refCount();
  }

  getUserInfo(): Observable<User> {
    return this.subject.asObservable();
  }

  findUserDetail(loginname: string): Observable<UserDetails> {
    return this.http.get(`${this.api_url}/user/${loginname}`).map(res => {
      return res.json() as UserDetails
    })
  }
}
