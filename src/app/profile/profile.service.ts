import { Injectable, Inject } from '@angular/core';
import { UserDetails, User } from "../domain/entities"
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ProfileService {

  constructor( @Inject('user') private service) {

  }

  getUserDetail(): Observable<UserDetails> {
    return this.service.getUserInfo().pluck("loginname").switchMap(name => {
      return this.service.findUserDetail(name);
    });
  }
}
