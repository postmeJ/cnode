import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx'
import { Http } from "@angular/http"
import { UserDetails, User, BASE_API_URL, TopicDetail } from "../domain/entities"

@Injectable()
export class TopicsService {
  constructor(private http: Http) {

  }
  getTopicDetailById(id: string): Observable<TopicDetail> {
    return this.http.get(`${BASE_API_URL}/topic/${id}`).map(res => {
      return res.json() as TopicDetail;
    })
  }
}
