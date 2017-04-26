import { Component, OnInit, Inject } from '@angular/core';
import { MdlSnackbarService } from "angular2-mdl"
import { AUTH_TOKEN_KEY } from "../../domain/entities"
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish-topic',
  templateUrl: './publish-topic.component.html',
  styleUrls: ['./publish-topic.component.css']
})
export class PublishTopicComponent implements OnInit {
  topicTypes: [any] = [
    { name: "分享", value: "share" },
    { name: "问答", value: "ask" },
    { name: "招聘", value: "job" }
  ];
  private _authToken: string;
  get authToken(): string {
    this._authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return this._authToken;
  }

  topicType: any;
  content: string = "";
  title: string = "";
  constructor(private MdlSnackbarService: MdlSnackbarService, @Inject('topics') private topicService, private router:Router) { }

  ngOnInit() {
  }
  getSelectValue($event) {
    this.topicType = $event;
  }
  onSubmit() {
    if (this.topicType == null) {
      this.MdlSnackbarService.showToast("请选择主题");
      return;
    }

    if (this.title.length < 10) {
      this.MdlSnackbarService.showToast("标题字数十个字以上");
      return;
    }
    if (this.content.length == 0) {
      this.MdlSnackbarService.showToast("请输入内容");
      return;
    }
    this.topicService.publishTopic(this.authToken, this.title, this.topicType.value, this.content).subscribe(res => {
      if (res.success) {
        this.MdlSnackbarService.showToast("发表成功");
        this.router.navigate(['topics']);
      }
    })
  }
}
