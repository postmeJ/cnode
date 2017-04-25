import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Topic } from "../../domain/entities"

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  constructor() { }
  @Input() topic: Topic;
  @Output() onClick = new EventEmitter<boolean>()
  ngOnInit() {
  }
  clicked() {
    this.onClick.emit(true);
  }
}
