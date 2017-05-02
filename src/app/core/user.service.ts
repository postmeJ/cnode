import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { User, BASE_API_URL, USER_INFO_KEY, UserDetails } from "../domain/entities"
import { Observable } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private api_url = BASE_API_URL;
  /*
    replaySubject可以缓存过去的值，
    这里只缓存一次，
    subject.next(null)就清空了缓存值
   */
  private subject: ReplaySubject<User> = new ReplaySubject<User>(1);
  private user: User;
  constructor(private http: Http) {
    let user = JSON.parse(sessionStorage.getItem(USER_INFO_KEY));
    this.subject.next(user);
    this.subject.complete(); 
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
  //清空用户信息
  clearUserInfo(): void {
    this.subject.next(null);
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
