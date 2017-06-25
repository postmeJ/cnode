import { Component, OnInit, Input, Output, Inject, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Replies } from '../../domain/entities'
import { MdlTextFieldComponent, MdlDialogReference, MdlSnackbarService, MdlDialogComponent } from 'angular2-mdl'
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit, OnDestroy {
  reply: string;
  @ViewChild('replyDialog') replyDialog: MdlDialogComponent;

  @ViewChild(MdlTextFieldComponent) private tfName: MdlTextFieldComponent;
  constructor(private MdlSnackbarService: MdlSnackbarService, @Inject('user') private userService) { }
  _replys: Replies[] = [];
  replyId: string;
  private _takeUntil$: Subject<boolean> = new Subject<boolean>();
  @Input()
  set replys(replys: Replies[]) {
    this._replys = [...replys];
  }
  get replys() {
    return this._replys;
  }
  @Output() onReply = new EventEmitter<any>();

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this._takeUntil$.next(true);
    this._takeUntil$.unsubscribe();
  }

  onReplyTriggered(id: string, author: any): void {
    this.userService.getUserInfo().do(user => {
      if (user === null) {
        this.MdlSnackbarService.showToast('您还没有登录，请先登录');
      }
    }).filter(user => user !== null).takeUntil(this._takeUntil$).subscribe((user) => {
      this.replyId = id;
      this.reply = `@${author.loginname} `;
      this.replyDialog.show();
    })
  }
  submitReply(): void {
    if (!this.reply) {
      this.MdlSnackbarService.showToast('评论不能为空');
      return;
    }
    this.onReply.emit({
      reply: this.reply,
      replyId: this.replyId
    });
    this.replyDialog.close();
    this.reply = '';
  }
  public onDialogShow(dialogRef: MdlDialogReference): void {
    this.tfName.setFocus();
  }

  public onDialogHide(): void {
  }
}
