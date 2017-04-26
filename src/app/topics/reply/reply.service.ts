import { Injectable } from '@angular/core';
import { BASE_API_URL, AUTH_TOKEN_KEY } from "../../domain/entities"
import { Http, Headers } from "@angular/http";
import { Observable } from 'rxjs/Rx'

@Injectable()
export class ReplyService {
  private _authToken: string;
  isCollect: boolean;

  get authToken(): string {
    this._authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return this._authToken;
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  toStar(replyId: string):Observable<any> {
    return this.http.post(`${BASE_API_URL}/reply/${replyId}/ups`, JSON.stringify({accesstoken: this.authToken}), {headers: this.headers})
      .map(res => res.json());
  }
}
