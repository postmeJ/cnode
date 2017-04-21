import { Component, OnInit, Inject, Input } from '@angular/core';
import { MdlSnackbarService } from "angular2-mdl"
import { UserDetails, Topics } from "../domain/entities"

@Component({
  selector: 'app-user',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails: UserDetails;
  collectTopics: Topics[] = [];
  @Input() basis: boolean = true;
  constructor( @Inject('profile') private service, private MdlSnackbarService: MdlSnackbarService) { }

  ngOnInit() {
    this.service.getUserDetail()
      .subscribe(user => {
        this.userDetails = Object.assign({}, user.data);
        console.log(this.userDetails);
      },
      error => {
        this.MdlSnackbarService.showToast("请求出错，请联系管理员")
      }
      );
    this.service.getUserCollect().subscribe(topics => {
      this.collectTopics.push(...topics.data);
    },
      error => {
        this.MdlSnackbarService.showToast("请求出错，请联系管理员")
      }
    )
  }
}
