import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopicDetail } from "../../domain/entities"

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  detail: TopicDetail = null;
  constructor( @Inject('topics') private topicSevice,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.pluck("id").switchMap(id => {
      return this.topicSevice.getTopicDetailById(id)
    }).subscribe(({ data }) => {
      this.detail = Object.assign({}, data);
    })
  }

}
