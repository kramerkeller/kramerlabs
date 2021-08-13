import { UserFacade } from './../store/user.facade';
import { Component } from '@angular/core';

@Component({
  selector: 'kramerlabs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _userFacade: UserFacade) {}

  googleLoginClick() {
    this._userFacade.googleLogin();
  }
}
