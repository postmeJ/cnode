import {
  Component, OnInit, Inject, ViewChildren,
  QueryList, AfterViewInit, ViewChild, OnDestroy, ElementRef
} from '@angular/core';
import { UserDetails, Topic, AUTH_TOKEN_KEY, BrowseInfo, BROWSEINFO_KEY } from '../domain/entities'
import { MdlLayoutTabPanelComponent, MdlLayoutContentComponent, MdlSnackbarService } from 'angular2-mdl'
import { Router } from '@angular/router'
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx'

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})

export class TopicsComponent implements OnInit, OnDestroy {
  private _brower: BrowseInfo;
  // 获取用户浏览记录
  get browser() {
    this._brower = JSON.parse(sessionStorage.getItem(BROWSEINFO_KEY)) || null;
    return this._brower;
  }
  // 设置用户浏览记录
  set browser(obj: BrowseInfo) {
    sessionStorage.setItem(BROWSEINFO_KEY, JSON.stringify(obj));
    this._brower = obj;
  }
  userDetail: UserDetails = null;
  list: Array<Topic> = [];
  private titles: Array<string> = ['全部', '精华', '分享', '问答', '招聘'];
  tabActiveIndex: number;  // 记录高亮tab所处位置
  private scrollTop: number;    // 记录滚动距离顶部的高度
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
  @ViewChildren('topic') topicDom: QueryList<ElementRef>
  @ViewChild(MdlLayoutContentComponent) layContent: MdlLayoutContentComponent

  constructor( @Inject('user') private userService,
    @Inject('topics') private topicsService,
    @Inject('message') private messageService,
    private router: Router,
    private MdlSnackbarService: MdlSnackbarService) {
    if (this.browser === null) {
      this.tabActiveIndex = 0;
      this.scrollTop = 0;
      return;
    }
    // 设置用户浏览记录
    const { tabIndex, scrollTop, page } = this.browser;
    this.tabActiveIndex = tabIndex;
    this.scrollTop = scrollTop;
    this.pageIndex = page;
  }

  ngOnInit() {
    this.getUserDetail();
    this.getMsgCount();
  }
  // 检查用户浏览记录
  private isBrowser(): boolean {
    return this.browser !== null;
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
    this.userService.getUserInfo().filter(user => user != null).pluck('loginname').switchMap(name => {
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
    // 滚动到顶部，重置页数
    this.layContent.el.scrollTop = this.scrollTop = 0;
    this.pageIndex = 1;
    const tab = this.getActiveTab();
    this.browser = Object.assign(new BrowseInfo(), { page: this.pageIndex, scrollTop: this.layContent.el.scrollTop, tabIndex: this.titles.indexOf(tab.title) })
    this.getTopics(this.pageIndex, this.limit, tab.title);
  }

  ngAfterViewInit() {
    if (this.isBrowser()) {
      // 获取用户浏览的所有记录并滚动到所在位置
      this.getTopics(1, this.pageIndex * this.limit, this.titles[this.tabActiveIndex]);
      this.topicDom.changes.first().mapTo(this.scrollTop).takeUntil(this._takeUntil$).subscribe((scrollTop) => this.layContent.el.scrollTop = scrollTop);
    } else {
      const tab = this.getActiveTab();
      this.getTopics(this.pageIndex, this.limit, tab.title);
    }

    this.scrollLoad();
  }
  // 滚动到底部
  isBottom(el): boolean {
    return el.scrollHeight - (el.scrollTop + el.clientHeight) <= 100 && !this.loading
  }
  getTopics(pageIndex: number, limit: number, title: string): void {
    this.list = [];
    this.loading = true;
    this.topicsService.getTopicsList(pageIndex, limit, title).takeUntil(this._takeUntil$).subscribe(res => {
      if (res.success) {
        this.list = [...res.data];
        this.loading = false;
      }
    })
  }
  gotoDetail($event, id): void {
    const tab = this.getActiveTab();
    const tabIndex = this.titles.indexOf(tab.title);

    this.browser = Object.assign(new BrowseInfo(), { scrollTop: this.layContent.el.scrollTop, page: this.pageIndex, tabIndex });
    this.router.navigate([`/detail/${id}`]);
  }
  // 滚动加载
  scrollLoad() {
    const scrollElement = this.layContent.el;
    let scroll$ = Observable.fromEvent(scrollElement, 'scroll');

    scroll$.throttleTime(200).filter(() => this.isBottom(scrollElement)).map(() => {
      return this.getActiveTab();
    }).concatMap((tab) => {
      this.loading = true;
      return this.topicsService.getTopicsList(++this.pageIndex, this.limit, tab.title);
    }).takeUntil(this._takeUntil$).subscribe((res: any) => {
      this.list.push(...res.data);
      this.loading = false;
    })
  }
  ngOnDestroy(): void {
    this._takeUntil$.next(true);
    this._takeUntil$.unsubscribe();
  }
}
