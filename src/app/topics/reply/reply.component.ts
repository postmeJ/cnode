import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Replies } from "../../domain/entities"
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  reply: string;
  constructor() { }
  _replys: Replies[] = [];

  @Input() 
  set replys(replys: Replies[]) {
    this._replys = [...replys];
  }
  get replys(){
    return this._replys;
  }
  @Output() onStar = new EventEmitter<boolean>();
  @Output() onReply = new EventEmitter<string>();

  ngOnInit() {
  }
  onStarTriggered(){
    this.onStar.emit(true);
  }
  onReplyTriggered(){
    this.onReply.emit(this.reply);
  }
}
