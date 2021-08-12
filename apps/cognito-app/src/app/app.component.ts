import { Component, ChangeDetectorRef } from '@angular/core';
// Do we really need this? is it worth it?
import { CognitoUserInterface } from '@aws-amplify/ui-components';
import { HttpClient } from '@angular/common/http';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

@Component({
  selector: 'kramerlabs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'amplify-angular-auth';
  user: CognitoUserInterface;

  currentUser: CognitoUserInterface | null = null;

  constructor(private ref: ChangeDetectorRef, private _http: HttpClient) {
    Auth.currentAuthenticatedUser().then(
      (user: any) => this.currentUser = user,
      _err => console.log('redirect to login page')
    );
  }

  googleLoginClick() {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google
    })
  }

  signOutClick() {
    Auth.signOut();
  }

  read() {
    // const url = 'https://oz4p00bk0k.execute-api.us-east-1.amazonaws.com/Prod/writedb';
    const url = 'http://localhost:4200/api/users/7be4e856-fb5b-4cba-aaf0-fd1bbd80da45';
    const token = this.currentUser?.signInUserSession?.idToken?.jwtToken || '';
    console.log('token', token);
    console.log(this.currentUser);
    const headers = {"token": token}; // put in token for now
    this._http.get(url, {headers}).subscribe((response) => console.log(response));
  }

  write() {
    // const url = 'https://oz4p00bk0k.execute-api.us-east-1.amazonaws.com/Prod/writedb';
    const url = 'http://localhost:4200/api/writedb';
    const token = this.currentUser?.signInUserSession?.idToken?.jwtToken || '';
    console.log('token', token);
    console.log(this.currentUser);
    const headers = {"token": token}; // put in token for now
    this._http.post(url, {"id":"1","name":"ram"}, {headers}).subscribe((response) => console.log(response));
  }
}
