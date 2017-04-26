import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Message } from "../../domain/entities"
@Component({
  selector: 'app-msg-item',
  templateUrl: './msg-item.component.html',
  styleUrls: ['./msg-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MsgItemComponent implements OnInit {
  @Input() msg: Message;
  @Output() onClick = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit() {
  }
  clicked(): void {
    this.onClick.emit(true);
  }
}
