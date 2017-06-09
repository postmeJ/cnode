import { Component, Inject, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Replies, USER_INFO_KEY, User } from "../../../domain/entities"
import { MdlSnackbarService } from "angular2-mdl"
import { Subject } from 'rxjs/Rx'

@Component({
  selector: 'app-reply-item',
  templateUrl: './reply-item.component.html',
  styleUrls: ['./reply-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReplyItemComponent implements OnInit, OnDestroy {
  @Input() item: Replies;
  @Output() onReplyTriggered = new EventEmitter<string>();
  private user: User = JSON.parse(sessionStorage.getItem(USER_INFO_KEY));
  private _takeUntil$: Subject<boolean> = new Subject<boolean>();
  constructor( @Inject('reply') private replySevice, private MdlSnackbarService: MdlSnackbarService, @Inject('user') private userService) {
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this._takeUntil$.next(true);
    this._takeUntil$.unsubscribe();
  }
  onStar(reply_id: string): void {
    this.userService.getUserInfo().do(user => {
      if (user === null) {
        this.MdlSnackbarService.showToast("您还没有登录，请先登录");
      }
    }).filter(user => user !== null).switchMap(() => {
      return this.replySevice.toStar(reply_id);
    }).takeUntil(this._takeUntil$).subscribe(res => {
      if (res.action === "up") {
        this.item.is_uped = true;
        this.item.ups = [...this.item.ups, this.user.id.toString()];
      } else if (res.action === "down") {
        this.item.is_uped = false;
        this.item.ups = this.item.ups.filter(id => id !== this.user.id);
      }
    },
      ({ _body }) => {
        let error = JSON.parse(_body);
        this.MdlSnackbarService.showToast(error.error_msg)
      }
      )
  }
  onReply(reply_id: string): void {
    this.onReplyTriggered.emit(reply_id);
  }
}
