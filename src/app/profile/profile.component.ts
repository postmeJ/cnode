import { Component, OnInit, Inject, Input, trigger, state, transition, style, animate, OnDestroy } from '@angular/core';
import { MdlSnackbarService } from "angular2-mdl"
import { UserDetails, Topics } from "../domain/entities"
import { Subject } from 'rxjs/Rx'

@Component({
  selector: 'app-user',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('animated', [
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
      ]),
      transition('* => void', [
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({
          transform: 'translateY(-50px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  userDetails: UserDetails;
  collectTopics: Topics[] = [];
  @Input() basis: boolean = true;
  private _takeUntil$: Subject<boolean> = new Subject<boolean>();
  constructor( @Inject('profile') private service, private MdlSnackbarService: MdlSnackbarService) { }

  ngOnInit() {
    this.service.getUserDetail()
      .takeUntil(this._takeUntil$)
      .subscribe(user => {
        this.userDetails = Object.assign({}, user.data);
        console.log(this.userDetails);
      },
      error => {
        this.MdlSnackbarService.showToast("请求出错，请联系管理员")
      }
      );
    this.service.getUserCollect().takeUntil(this._takeUntil$).subscribe(topics => {
      this.collectTopics.push(...topics.data);
    },
      error => {
        this.MdlSnackbarService.showToast("请求出错，请联系管理员")
      }
    )
  }
  ngOnDestroy(): void {
    this._takeUntil$.next(true);
    this._takeUntil$.unsubscribe();
  }
}
