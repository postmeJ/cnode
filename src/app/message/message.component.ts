import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Inject } from '@angular/core';
import { Router } from "@angular/router"
import { MdlLayoutTabPanelComponent } from "angular2-mdl"
import { Message, AUTH_TOKEN_KEY } from "../domain/entities"

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @ViewChildren(MdlLayoutTabPanelComponent) tabs: QueryList<MdlLayoutTabPanelComponent>
  loading: boolean = false;
  readMessages: Message[] = [];
  unreadMessages: Message[] = [];

  private _authToken: string;
  get authToken(): string {
    this._authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return this._authToken;
  }

  constructor( @Inject('message') private messageService, private router: Router) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.getMessage(this.authToken);
  }
  private getMessage(accesstoken: string) {
    let tab = this.getActiveTab();
    switch (tab.title) {
      case '已读消息':
        return this.getReadMessage(accesstoken);
      case '未读消息':
        return this.getUnReadMessage(accesstoken);
      default:
        return;
    }
  }
  private getReadMessage(accesstoken: string) {
    this.loading = true;
    this.readMessages = [];

    this.messageService.getMessageByCondition(accesstoken, "has_read_messages").subscribe(res => {
      this.readMessages = [...res]
      this.loading = false;
    });
  }
  private getUnReadMessage(accesstoken: string) {
    this.loading = true;
    this.unreadMessages = [];

    this.messageService.getMessageByCondition(accesstoken, "hasnot_read_messages").subscribe(res => {
      this.unreadMessages = [...res]
      this.loading = false;
    });
  }
  private getActiveTab(): MdlLayoutTabPanelComponent {
    return this.tabs.toArray().filter(i => {
      return i.isActive == true;
    })[0]
  }
  gotoDetail(id: string): void {
    this.router.navigate([`/detail/${id}`])
  }
  makeMessage(msgId: string, topicId: string) {
    this.messageService.makeOneMessage(this.authToken, msgId).subscribe(res => {
      if (res.success) {
        this.gotoDetail(topicId);
      }
    })
  }
  makeAll() {
    this.messageService.makeAllMessage(this.authToken).subscribe(res => {
      if (res.success) {
        this.getMessage(this.authToken);
      }
    })
  }
  private tabChanged($event) {
    this.getMessage(this.authToken);
  }
}
