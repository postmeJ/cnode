import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx'
import { Http } from "@angular/http"
import { UserDetails, User } from "../domain/entities"

@Injectable()
export class TopicsService {
  constructor( @Inject('user') private service, private http: Http) {

  }

  getUserDetail(): Observable<UserDetails> {
    return this.service.getUserInfo().pluck("loginname").switchMap(name => {
      return this.service.findUserDetail(name);
    });
  }

}
