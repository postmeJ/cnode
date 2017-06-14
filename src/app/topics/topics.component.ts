import { Component, OnInit, Inject, ViewChildren, QueryList, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { UserDetails, Topic, AUTH_TOKEN_KEY } from "../domain/entities"
import { MdlLayoutTabPanelComponent, MdlLayoutContentComponent, MdlSnackbarService } from "angular2-mdl"
import { Router } from "@angular/router"
import { Observable, Subject } from 'rxjs/Rx'

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit, OnDestroy {
  isListPage: boolean = true;
  userDetail: UserDetails = null;
  list: Topic[] = [];
  private pageIndex: number = 1;
  private limit: number = 10;
  private loading: boolean = false;
  private msgCount: number = 0;
  private _authToken: string;
  private _takeUntil$: Subject<boolean> = new Subject<boolean>();
  get authToken(): string {
    this._authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return this._authToken;
  }
  @ViewChildren(MdlLayoutTabPanelComponent) tabs: QueryList<MdlLayoutTabPanelComponent>
  @ViewChild(MdlLayoutContentComponent) layContent: MdlLayoutContentComponent

  constructor( @Inject('user') private userService,
    @Inject('topics') private topicsService,
    @Inject('message') private messageService,
    private router: Router,
    private MdlSnackbarService: MdlSnackbarService) {
      this.router.events.map(({url}) => url === '/topics' || url === '/' ? true : false).takeUntil(this._takeUntil$).subscribe((result) => {
          this.isListPage = result;
      });
    }

    ngOnInit() {
      this.getUserDetail();
      this.getMsgCount();
    }
    getMsgCount() {
      this.userService.getUserInfo().filter(user => user !== null).switchMap(() => {
        return this.messageService.getUnreadMessageCount(this.authToken);
      }).takeUntil(this._takeUntil$).subscribe(res => {
        if (res.success) {
          this.msgCount = res.data;
        }
      });
    }
    getUserDetail(): void {
      this.userService.getUserInfo().filter(user => user != null).pluck("loginname").switchMap(name => {
        return this.userService.findUserDetail(name);
      }).takeUntil(this._takeUntil$).subscribe(({ data }) => {
        this.userDetail = Object.assign({}, data);
      })
    }
    private getActiveTab(): MdlLayoutTabPanelComponent {
      return this.tabs.toArray().filter(i => {
        return i.isActive == true;
      })[0]
    }
    tabChanged(e): void {
      //滚动到顶部，重置页数
      this.layContent.el.scrollTop = 0;
      this.pageIndex = 1;
      this.getTopics();
    }

    ngAfterViewInit() {
      this.getTopics()
      this.scrollLoad();
    }
    isBottom(el): boolean {
      //滚动到底部
      return el.scrollHeight - (el.scrollTop + el.clientHeight) <= 100 && !this.loading
    }
    getTopics(): void {
      let tab: MdlLayoutTabPanelComponent = this.getActiveTab();

      this.list = [];
      this.loading = true;
      this.topicsService.getTopicsList(this.pageIndex, this.limit, tab.title).takeUntil(this._takeUntil$).subscribe(res => {
        if (res.success) {
          this.list = [...res.data];
          this.loading = false;
        }
      })
    }
    gotoDetail($event, id): void {
      this.isListPage = false;
      this.router.navigate([`/topics/detail/${id}`]);
    }
    //滚动加载
    scrollLoad() {
      let scrollElement = this.layContent.el;
      let scroll$ = Observable.fromEvent(scrollElement, "scroll");

      scroll$.throttleTime(200).filter(() => this.isBottom(scrollElement)).map(() => {
        return this.getActiveTab();
      }).concatMap((tab) => {
        this.loading = true;
        return this.topicsService.getTopicsList(++this.pageIndex, this.limit, tab.title);
      }).delay(500).takeUntil(this._takeUntil$).subscribe((res: any) => {
        this.list.push(...res.data);
        this.loading = false;
      })
    }
    ngOnDestroy(): void {
      this._takeUntil$.next(true);
      this._takeUntil$.unsubscribe();
    }
}
