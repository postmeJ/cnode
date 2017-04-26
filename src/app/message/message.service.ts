import { Injectable } from '@angular/core';
import { Http, Response, Headers} from "@angular/http"
import { Observable } from 'rxjs/Rx'

@Injectable()
export class MessageService {

  constructor(private http: Http) { }

  getUnreadMessageCount(accesstoken: string) :O{

  }
}
