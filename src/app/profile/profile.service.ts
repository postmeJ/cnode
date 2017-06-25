import { Injectable, Inject } from '@angular/core';
import { UserDetails, User } from '../domain/entities';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { BASE_API_URL, Topics } from '../domain/entities';

@Injectable()
export class ProfileService {
  constructor( @Inject('user') private service, private http: Http) {
  }

  getUserDetail(): Observable<UserDetails> {
    return this.service.getUserInfo().pluck('loginname').switchMap(name => {
      return this.service.findUserDetail(name);
    });
  }
  getUserCollect(): Observable<Topics> {
    return this.service.getUserInfo().pluck('loginname').switchMap(name => {
      return this.http.get(`${BASE_API_URL}/topic_collect/${name}`).map(res => res.json() as Topics)
    }) 
  }
}
