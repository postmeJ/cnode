import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdlSnackbarService } from 'angular2-mdl';
import { Auth, AUTH_TOKEN_KEY } from '../domain/entities';
import { Subject } from 'rxjs/Rx';
import { AuthGuardService } from '../core/auth-guard.service';
import { slideDown } from'../domain/animate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    slideDown
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  accessToken: string;
  authToken: string;
  auth: Auth;
  private _takeUntil$: Subject<boolean> = new Subject<boolean>();
  constructor( @Inject('auth') private service,
    private router: Router,
    private mdlSnackbarService: MdlSnackbarService,
    @Inject('user') private userService,
    private authGuard: AuthGuardService
    ) { 
      this.authToken = this.authGuard.getAuthToken();
    }

  ngOnInit() {
    if (this.authToken) {
      localStorage.clear();
      sessionStorage.clear();
    }
    this.userService.clearUserInfo();
  }
  ngOnDestroy(): void {
    this._takeUntil$.next(true);
    this._takeUntil$.unsubscribe();
  }
  onSubmit(): void {
    if (!this.accessToken) {
      this.mdlSnackbarService.showToast('accessToken不能为空');
      return;
    }

    this.service.loginWithCredentials(this.accessToken).takeUntil(this._takeUntil$).subscribe(auth => {
      this.auth = Object.assign({}, auth);
      if (!auth.hasError) {
        this.authGuard.setAuthToken(this.accessToken);
        this.router.navigate([auth.redirectUrl || '/']);
      }
    }, ({ _body }) => {
      let error = JSON.parse(_body);

      if (!error.success) {
        this.mdlSnackbarService.showToast(`${error.error_msg}`);
      }
    })
  }
}
