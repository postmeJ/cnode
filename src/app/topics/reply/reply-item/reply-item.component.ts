import { Component, Inject, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Replies, USER_INFO_KEY, User } from "../../../domain/entities"
import { MdlSnackbarService } from "angular2-mdl"

@Component({
  selector: 'app-reply-item',
  templateUrl: './reply-item.component.html',
  styleUrls: ['./reply-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReplyItemComponent implements OnInit {
  @Input() item: Replies;
  @Output() onReplyTriggered = new EventEmitter<string>();
  private user: User = JSON.parse(sessionStorage.getItem(USER_INFO_KEY));

  constructor( @Inject('reply') private replySevice, private MdlSnackbarService: MdlSnackbarService) {
  }

  ngOnInit() {
  }
  onStar(reply_id: string) {
    this.replySevice.toStar(reply_id).subscribe(res => {
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
  onReply(reply_id: string) {
    this.onReplyTriggered.emit(reply_id);
  }
}
