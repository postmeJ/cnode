import { Component, OnInit, Inject } from '@angular/core';
import { UserDetails } from "../domain/entities"

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  userDetail: UserDetails = null;
  constructor( @Inject('user') private userService) { }

  ngOnInit() {
    this.getUserDetail();
  }
  getUserDetail() {
    this.userService.getUserInfo().filter(user => user != null).pluck("loginname").switchMap(name => {
      return this.userService.findUserDetail(name);
    }).subscribe(({ data }) => {
      this.userDetail = Object.assign({}, data);
    })
  }
  tabChanged(e) {
    console.log(e);
  }
}
