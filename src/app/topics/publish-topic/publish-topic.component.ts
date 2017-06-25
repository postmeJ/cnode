import { Component, OnInit, Inject, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { MdlSnackbarService, MdlDialogService } from 'angular2-mdl';
import { AUTH_TOKEN_KEY, CanComponentDeactivate } from '../../domain/entities';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthGuardService } from '../../core/auth-guard.service';
import { slideUp } from '../../domain/animate';

@Component({
  selector: 'app-publish-topic',
  templateUrl: './publish-topic.component.html',
  styleUrls: ['./publish-topic.component.css'],
  animations: [
    slideUp
  ]
})
export class PublishTopicComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  topicTypes: [any] = [
    { name: '分享', value: 'share' },
    { name: '问答', value: 'ask' },
    { name: '招聘', value: 'job' }
  ];
  form: FormGroup;
  private destory$: Subject<boolean> = new Subject<boolean>();
  private authToken: string;

  constructor(private MdlSnackbarService: MdlSnackbarService,
    @Inject('topics') private topicService,
    private router: Router,
    private dialogService: MdlDialogService,
    private fb: FormBuilder,
    private authGuard: AuthGuardService) {
    this.authToken = this.authGuard.getAuthToken();
  }

  ngOnInit() {
    this.createForm();
  }
  ngOnDestroy() {
    this.destory$.next(true);
    this.destory$.unsubscribe();
  }
  createForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onSubmit({ value, valid }) {
    this.topicService.publishTopic(this.authToken, value.title, value.type, value.content).takeUntil(this.destory$).subscribe(res => {
      if (res.success) {
        this.MdlSnackbarService.showToast('发表成功');
        this.router.navigate(['/topics']);
      }
    }, ({ _body }) => {
      const error = JSON.parse(_body);

      if (!error.success) {
        this.MdlSnackbarService.showToast(`${error.error_msg}`);
      }
    });
  }
  // 判断表单中是否存在有效值
  private hasDefenses(form: FormGroup): boolean {
    for (let c in form.controls) {
      if (form.controls[c].value.toString().trim().length > 0) {
        return true;
      }
    }
    return false;
  }
  canDeactivate(): boolean {
    // 待解决bug CanDeactivate Bug when multi click back button of browser with 'return false' of canDeactivate
    if (this.hasDefenses(this.form)) {
      return confirm('您的帖子尚未发布，确认离开此页面?');
    }
    return true;
  }
}
