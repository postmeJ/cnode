import { Component, OnInit, Inject, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { UserDetails, Topic } from "../domain/entities"
import { MdlLayoutTabPanelComponent } from "angular2-mdl"
import { Router } from "@angular/router"

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  userDetail: UserDetails = null;
  list: Topic[] = [];
  private pageIndex: number = 1;
  private limit: number = 10;
  private loading: boolean = false;
  constructor( @Inject('user') private userService, @Inject('topics') private topicsService, private router: Router) { }
  @ViewChildren(MdlLayoutTabPanelComponent) tabs: QueryList<MdlLayoutTabPanelComponent>

  ngOnInit() {
    this.getUserDetail();
  }
  getUserDetail(): void {
    this.userService.getUserInfo().filter(user => user != null).pluck("loginname").switchMap(name => {
      return this.userService.findUserDetail(name);
    }).subscribe(({ data }) => {
      this.userDetail = Object.assign({}, data);
    })
  }
  private getActiveTab(): MdlLayoutTabPanelComponent {
    return this.tabs.toArray().filter(i => {
      return i.isActive == true;
    })[0]
  }
  tabChanged(e): void {
    this.getTopics();
  }

  ngAfterViewInit() {
    this.getTopics()
  }

  getTopics(): void {
    let tab: MdlLayoutTabPanelComponent = this.getActiveTab();

    this.loading = true;
    this.topicsService.getTopicsList(this.pageIndex, this.limit, tab.title).subscribe(res => {
      if (res.success) {
        this.list = [];
        this.list = [...res.data];
        this.loading = false;
      }
    })
  }
  gotoDetail($event, id):void {
    this.router.navigate([`/detail/${id}`]);
  }
}
