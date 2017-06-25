import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { MdlSnackbarService } from 'angular2-mdl';
import { UserDetails, Topics } from '../domain/entities';
import { Subject } from 'rxjs/Rx';
import { slideUp } from '../domain/animate';

@Component({
  selector: 'app-user',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    slideUp
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  userDetails: UserDetails;
  collectTopics: Topics[] = [];
  loading: boolean = false;
  @Input() basis: boolean = true;
  private _takeUntil$: Subject<boolean> = new Subject<boolean>();
  constructor( @Inject('profile') private service, private MdlSnackbarService: MdlSnackbarService) { }

  ngOnInit() {
    this.loading = true;
    this.service.getUserDetail()
      .takeUntil(this._takeUntil$)
      .subscribe(user => {
        this.loading = false;
        this.userDetails = Object.assign({}, user.data);
      },
      error => {
        this.MdlSnackbarService.showToast('请求出错，请联系管理员');
      }
      );
    this.service.getUserCollect().takeUntil(this._takeUntil$).subscribe(topics => {
      this.collectTopics.push(...topics.data);
    },
      error => {
        this.MdlSnackbarService.showToast('请求出错，请联系管理员');
      }
    )
  }
  ngOnDestroy(): void {
    this._takeUntil$.next(true);
    this._takeUntil$.unsubscribe();
  }
}
