import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Replies } from "../../domain/entities"
import { MdlTextFieldComponent, MdlDialogReference, MdlSnackbarService, MdlDialogComponent } from "angular2-mdl"
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  reply: string;
  @ViewChild('replyDialog') replyDialog: MdlDialogComponent;

  @ViewChild(MdlTextFieldComponent) private tfName: MdlTextFieldComponent;
  constructor(private MdlSnackbarService: MdlSnackbarService) { }
  _replys: Replies[] = [];
  replyId: string;
  @Input()
  set replys(replys: Replies[]) {
    this._replys = [...replys];
  }
  get replys() {
    return this._replys;
  }
  @Output() onReply = new EventEmitter<any>();

  ngOnInit() {
  }

  onReplyTriggered(id: string) {
    this.replyId = id;
    this.replyDialog.show()
  }
  submitReply() {
    if (!this.reply) {
      this.MdlSnackbarService.showToast("评论不能为空");
      return;
    }
    this.onReply.emit({
      reply: this.reply, 
      replyId: this.replyId
    });
     this.replyDialog.close();
     this.reply = "";
  }
  public onDialogShow(dialogRef: MdlDialogReference) {
    this.tfName.setFocus();
  }

  public onDialogHide() {
  }
}
