import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http"
import { Observable } from 'rxjs/Rx'
import { BASE_API_URL, Message } from "../domain/entities"

@Injectable()
export class MessageService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  getUnreadMessageCount(accesstoken: string): Observable<any> {
    return this.http.get(`${BASE_API_URL}/message/count?accesstoken=${accesstoken}`).map(res => res.json())
  }

  private getAllMessageByAccessToken(accesstoken: string): Observable<any> {
    return this.http.get(`${BASE_API_URL}/messages?accesstoken=${accesstoken}`).map(res => res.json())
  }

  getMessageByCondition(accesstoken: string, condition: string): Observable<Message[]> {
     return this.getAllMessageByAccessToken(accesstoken).filter(res => res.success).map(res => res.data).pluck(condition);
  }
  getUnreadMessageByAccessToken(accesstoken: string): Observable<Message[]> {
    return this.getAllMessageByAccessToken(accesstoken).filter(res => res.success).map(res => res.data).pluck("hasnot_read_messages")
  }

  getReadMessageByAccessToken(accesstoken: string): Observable<Message[]> {
    return this.getAllMessageByAccessToken(accesstoken).filter(res => res.success).map(res => res.data).pluck("has_read_messages")
  }

  makeAllMessage(accesstoken: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}/message/mark_all`, JSON.stringify({ accesstoken: accesstoken }), { headers: this.headers }).map(res => res.json())
  }
  makeOneMessage(accesstoken: string, msgId: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}/message/mark_one/${msgId}`, JSON.stringify({ accesstoken: accesstoken }), { headers: this.headers }).map(res => res.json())
  }
}
