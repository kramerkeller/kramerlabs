import { UserFacade } from './store/user.facade';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'kramerlabs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn$ = this._userFacade.$loggedIn;

  constructor(private _auth: AuthService, private _userFacade: UserFacade) {}

  ngOnInit(): void {
    this._userFacade.loadUser();
  }

  signOutClick() {
    this._userFacade.logoutUser();
  }
}
