import { Component, OnInit, Inject } from '@angular/core';
import { UserDetails } from "../domain/entities"

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  userDetail: UserDetails = null;
  constructor(@Inject('topics') private service) { }

  ngOnInit() {
    this.service.getUserDetail().subscribe(({data}) =>{
      this.userDetail = Object.assign({}, data);
    })
  }
 
  tabChanged(e) {
    console.log(e);
  }
}
