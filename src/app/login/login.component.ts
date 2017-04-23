import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdlSnackbarService } from "angular2-mdl"
import { Auth, AUTH_TOKEN_KEY } from "../domain/entities"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  accessToken: string;
  authToken: string = localStorage.getItem(AUTH_TOKEN_KEY);
  auth: Auth;
  constructor( @Inject('auth') private service, private router: Router, private mdlSnackbarService: MdlSnackbarService) { }

  ngOnInit() {
    if (this.authToken) {
      localStorage.clear();
      sessionStorage.clear();
    }
  }
  onSubmit(): void {
    if (!this.accessToken) {
      this.mdlSnackbarService.showToast("accessToken不能为空");
      return;
    }

    this.service.loginWithCredentials(this.accessToken).subscribe(auth => {
      this.auth = Object.assign({}, auth);
      if (!auth.hasError) {
        localStorage.setItem(AUTH_TOKEN_KEY, this.accessToken);
        this.router.navigate([auth.redirectUrl || "/"]);
      }
    }, ({_body}) => {
      let error = JSON.parse(_body);

      if (!error.success) {
        this.mdlSnackbarService.showToast(`${error.error_msg}`);
      }
    })
  }
}
