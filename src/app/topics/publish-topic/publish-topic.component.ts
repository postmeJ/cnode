import { Component, OnInit, Inject, transition, trigger, animate, state, style, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { MdlSnackbarService, MdlDialogService } from 'angular2-mdl';
import { AUTH_TOKEN_KEY, CanComponentDeactivate } from '../../domain/entities';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-publish-topic',
  templateUrl: './publish-topic.component.html',
  styleUrls: ['./publish-topic.component.css'],
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
export class PublishTopicComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  topicTypes: [any] = [
    { name: '分享', value: 'share' },
    { name: '问答', value: 'ask' },
    { name: '招聘', value: 'job' }
  ];
  @ViewChild('publishForm') form: ElementRef;
  private destory$: Subject<boolean> = new Subject<boolean>();
  private _authToken: string;
  get authToken(): string {
    this._authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return this._authToken;
  }

  topicType: any;
  content: string = '';
  title: string = '';
  constructor(private MdlSnackbarService: MdlSnackbarService,
    @Inject('topics') private topicService,
    private router: Router,
    private dialogService: MdlDialogService) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.destory$.next(true);
    this.destory$.unsubscribe();
  }
  getSelectValue($event) {
    this.topicType = $event;
  }
  onSubmit() {
    if (this.topicType == null) {
      this.MdlSnackbarService.showToast('请选择主题');
      return;
    }

    if (this.title.length < 10) {
      this.MdlSnackbarService.showToast('标题字数十个字以上');
      return;
    }
    if (this.content.length == 0) {
      this.MdlSnackbarService.showToast('请输入内容');
      return;
    }
    this.topicService.publishTopic(this.authToken, this.title, this.topicType.value, this.content).takeUntil(this.destory$).subscribe(res => {
      if (res.success) {
        this.MdlSnackbarService.showToast('发表成功');
        this.router.navigate(['/topics']);
      }
    });
  }
  canDeactivate() {
    // CanDeactivate Bug when multi click back button of browser with 'return false' of canDeactivate
    // 待解决bug
    if (this.form.nativeElement.classList.contains('ng-dirty')) {
      return confirm('您的帖子尚未发布，确认离开此页面?');
    }
    return true;
  }
}
