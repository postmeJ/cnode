import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Inject, animate, transition, trigger, state, style, OnDestroy } from '@angular/core';
import { Router } from "@angular/router"
import { MdlLayoutTabPanelComponent } from "angular2-mdl"
import { Message, AUTH_TOKEN_KEY } from "../domain/entities"
import { Subject } from 'rxjs/Rx'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  animations: [
    trigger('animated', [
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
      ]),
      transition('* => void', [
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({
          transform: 'translateY(50px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class MessageComponent implements OnInit, OnDestroy {
  @ViewChildren(MdlLayoutTabPanelComponent) tabs: QueryList<MdlLayoutTabPanelComponent>
  loading: boolean = false;
  readMessages: Message[] = [];
  unreadMessages: Message[] = [];

  private _authToken: string;
  get authToken(): string {
    this._authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return this._authToken;
  }
  private _takeUntil$: Subject<boolean> = new Subject<boolean>();

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

    this.messageService.getMessageByCondition(accesstoken, "has_read_messages").takeUntil(this._takeUntil$).subscribe(res => {
      this.readMessages = [...res]
      this.loading = false;
    });
  }
  private getUnReadMessage(accesstoken: string) {
    this.loading = true;
    this.unreadMessages = [];

    this.messageService.getMessageByCondition(accesstoken, "hasnot_read_messages").takeUntil(this._takeUntil$).subscribe(res => {
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
    this.messageService.makeOneMessage(this.authToken, msgId).takeUntil(this._takeUntil$).subscribe(res => {
      if (res.success) {
        this.gotoDetail(topicId);
      }
    })
  }
  makeAll() {
    this.messageService.makeAllMessage(this.authToken).takeUntil(this._takeUntil$).subscribe(res => {
      if (res.success) {
        this.getMessage(this.authToken);
      }
    })
  }
  private tabChanged($event) {
    this.getMessage(this.authToken);
  }
  ngOnDestroy(): void {
    this._takeUntil$.next(true);
    this._takeUntil$.unsubscribe();
  }
}
