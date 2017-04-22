import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopicDetail, AUTH_TOKEN_KEY } from "../../domain/entities"
import { MdlSnackbarService } from "angular2-mdl"

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit {
  detail: TopicDetail = null;
  private _authToken: string;
  isCollect: boolean;

  get authToken(): string {
    this._authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return this._authToken;
  }

  constructor( @Inject('topics') private topicSevice,
    @Inject('user') private userSevice,
    private route: ActivatedRoute,
    private MdlSnackbarService: MdlSnackbarService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.pluck("id").switchMap(id => {
      return this.topicSevice.getTopicDetailById(id, this.authToken)
    }).subscribe(({ data }) => {
      this.detail = Object.assign({}, data);
      this.isCollect = data.is_collect;
    })
  }
  collectTopic(topicId: string) {
    this.topicSevice.collectTopicById(topicId, this.authToken).subscribe(res => {
      if (res.success) {
        this.isCollect = true;
        this.MdlSnackbarService.showToast("已收藏")
      }
    })
  }
  deCollectTopic(topicId: string) {
    this.topicSevice.deCollectTopicById(topicId, this.authToken).subscribe(res => {
      if (res.success) {
         this.isCollect = false;
         this.MdlSnackbarService.showToast("已取消收藏")
      }
    })
  }
}
