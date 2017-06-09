import { Component, OnInit, Inject, ViewEncapsulation, trigger, state, style, transition, animate, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopicDetail, AUTH_TOKEN_KEY, Replies } from "../../domain/entities"
import { MdlSnackbarService } from "angular2-mdl"
import { Subject } from 'rxjs/Rx'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('animated', [
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
      ]),
      transition('* => void', [
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({
          transform: 'translateY(-50px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class DetailComponent implements OnInit, OnDestroy {
  detail: TopicDetail = null;
  private _authToken: string;
  isCollect: boolean;
  content: string;
  get authToken(): string {
    this._authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return this._authToken;
  }
  private _takeUntil$: Subject<boolean> = new Subject<boolean>();

  constructor( @Inject('topics') private topicSevice,
    private route: ActivatedRoute,
    private MdlSnackbarService: MdlSnackbarService,
    @Inject('user') private userService,
    private router: Router) { }

  ngOnInit() {
    this.getTopicDetail();
  }
  ngOnDestroy(): void {
    this._takeUntil$.next(true);
    this._takeUntil$.unsubscribe();
  }
  getTopicDetail() {
    this.route.params.pluck("id").switchMap(id => {
      return this.topicSevice.getTopicDetailById(id, this.authToken)
    }).takeUntil(this._takeUntil$).subscribe(({ data }) => {
      this.detail = Object.assign({}, data);
      this.isCollect = data.is_collect;
    })
  }
  collectTopic(topicId: string) {
    let user$ = this.userService.getUserInfo();
    user$.do(user => {
      if (user === null) {
        this.MdlSnackbarService.showToast("您还没有登录，请先登录")
      }
    }).filter(user => user !== null).switchMap(() => {
      return this.topicSevice.collectTopicById(topicId, this.authToken)
    }).takeUntil(this._takeUntil$).subscribe(res => {
      if (res.success) {
        this.isCollect = true;
        this.MdlSnackbarService.showToast("已收藏")
      }
    })
  }
  deCollectTopic(topicId: string) {
    this.topicSevice.deCollectTopicById(topicId, this.authToken).takeUntil(this._takeUntil$).subscribe(res => {
      if (res.success) {
        this.isCollect = false;
        this.MdlSnackbarService.showToast("已取消收藏")
      }
    })
  }
  submitReply(event) {
    this.topicSevice.createReply(this.authToken, event.replyId, this.detail.id, event.reply).takeUntil(this._takeUntil$).subscribe(res => {
      if (res.success) {
        this.MdlSnackbarService.showToast("回复成功")
        this.getTopicDetail();
      }
    })
  }
  onSubmit() {
    this.userService.getUserInfo().do(user => {
      if (user === null) {
        this.MdlSnackbarService.showToast("您还没有登录，请先登录")
      }
    }).filter(user => user !== null).switchMap(() => {
      return this.topicSevice.createReply(this.authToken, '', this.detail.id, this.content);
    }).takeUntil(this._takeUntil$).subscribe(res => {
      if (res.success) {
        this.MdlSnackbarService.showToast("回复成功");
        this.content = "";
        this.getTopicDetail();
      }
    }, ({ _body }) => {
      let error = JSON.parse(_body);
      this.MdlSnackbarService.showToast(error.error_msg);
    })
  }
}
