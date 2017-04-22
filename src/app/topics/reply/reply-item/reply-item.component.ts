import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Replies } from "../../../domain/entities"

@Component({
  selector: 'app-reply-item',
  templateUrl: './reply-item.component.html',
  styleUrls: ['./reply-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReplyItemComponent implements OnInit {
  isStar: boolean;
  @Input() item: Replies;
  @Output() onStarTriggered = new EventEmitter<boolean>();
  @Output() onReplyTriggered = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }
  onStar() {
    this.onStarTriggered.emit(true);
  }
  onReply() {
    this.onReplyTriggered.emit(true);
  }
}
