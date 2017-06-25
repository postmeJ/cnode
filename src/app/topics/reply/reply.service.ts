import { Injectable } from '@angular/core';
import { BASE_API_URL, AUTH_TOKEN_KEY } from '../../domain/entities';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthGuardService } from '../../core/auth-guard.service';

@Injectable()
export class ReplyService {
  private authToken: string;
  isCollect: boolean;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http, private authGuard: AuthGuardService) {
    this.authToken = this.authGuard.getAuthToken();
  }

  toStar(replyId: string):Observable<any> {
    return this.http.post(`${BASE_API_URL}/reply/${replyId}/ups`, JSON.stringify({accesstoken: this.authToken}), {headers: this.headers})
      .map(res => res.json());
  }
}
