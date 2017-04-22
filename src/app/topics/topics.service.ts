import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx'
import { Http, Headers } from "@angular/http"
import { UserDetails, User, BASE_API_URL, TopicDetail } from "../domain/entities"

@Injectable()
export class TopicsService {
   private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) {

  }
  getTopicDetailById(id: string, accessToken: string): Observable<TopicDetail> {
    console.log(`${BASE_API_URL}/topic/${id}?accesstoken=${accessToken}`)
    return this.http.get(`${BASE_API_URL}/topic/${id}?accesstoken=${accessToken}`).map(res => {
      return res.json() as TopicDetail;
    })
  }
  //收藏主题
  collectTopicById(topicId: string, accesstoken: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}/topic_collect/collect`, JSON.stringify({topic_id: topicId, accesstoken: accesstoken}), {headers: this.headers})
      .map(res => res.json())
  }
  //取消收藏
  deCollectTopicById(topicId: string, accesstoken: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}/topic_collect/de_collect`, JSON.stringify({topic_id: topicId, accesstoken: accesstoken}), {headers: this.headers})
      .map(res => res.json())
  }
}
