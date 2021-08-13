import { UserFacade } from './store/user.facade';
import { Component, ChangeDetectorRef } from '@angular/core';
// Do we really need this? is it worth it?
import { CognitoUserInterface } from '@aws-amplify/ui-components';
import { HttpClient } from '@angular/common/http';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'kramerlabs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _auth: AuthService, private _userFacade: UserFacade) {
    _userFacade.loadCognitoSession();
    this.test();
  }

  async test() {
    const test = await (await Auth.currentSession()).getIdToken().payload.sub;
    console.log('test', test);
  }

  // Call auth service
  signOutClick() {
    console.log('sign out');
    this._auth.signOut();
  }
}
