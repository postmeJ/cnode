import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { Http, Headers } from "@angular/http"
import { UserDetails, User, BASE_API_URL, TopicDetail, Topic } from "../domain/entities"

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
    return this.http.post(`${BASE_API_URL}/topic_collect/collect`, JSON.stringify({ topic_id: topicId, accesstoken: accesstoken }), { headers: this.headers })
      .map(res => res.json())
  }
  //取消收藏
  deCollectTopicById(topicId: string, accesstoken: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}/topic_collect/de_collect`, JSON.stringify({ topic_id: topicId, accesstoken: accesstoken }), { headers: this.headers })
      .map(res => res.json())
  }
  createReply(accesstoken: string, reply_id: string, topic_id: string, content: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}/topic/${topic_id}/replies`, JSON.stringify({ accesstoken: accesstoken, content: content, reply_id: reply_id }), { headers: this.headers })
      .map(res => res.json())
  }
  publishTopic(accesstoken: string, title: string, tab: string, content: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}/topics`, JSON.stringify({ accesstoken, title, tab, content }), { headers: this.headers })
      .map(res => res.json());
  }
  getType(title: string): string {
    switch (title) {
      case '全部':
        return '';
      case '精华':
        return 'good';
      case '分享':
        return 'share';
      case '问答':
        return 'ask';
      case '招聘':
        return 'job';
    }
  }
  getTopicsList(page: number = 1, limit: number = 10, title: string = ''): Observable<Topic> {
    let tab: string = this.getType(title);
    return this.http.get(`${BASE_API_URL}/topics?page=${page}&limit=${limit}&tab=${tab}`).map(res => {
      return res.json() as Topic
    })
  }
}
