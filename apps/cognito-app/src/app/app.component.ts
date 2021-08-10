import { Component, ChangeDetectorRef } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
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
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(private ref: ChangeDetectorRef, private _http: HttpClient) {}

  onLoginClick() {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google
    });
  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

  write() {
    // const url = 'https://oz4p00bk0k.execute-api.us-east-1.amazonaws.com/Prod/writedb';
    const url = 'http://localhost:4200/api';
    // I need to grab this from teh cookie?
    // const test = this.user?.signInUserSession?.accessToken?.jwtToken;
    const test = this.user?.signInUserSession?.idToken?.jwtToken || '';

    console.log(test);
    // const token = localStorage.getItem("token") || '';
    // console.log(token);
    const headers = {"token": test}; // put in token for now


    this._http.post(url, {"id":"1","name":"ram"}, {headers}).subscribe((response) => console.log(response));
  }

  read() {
    console.log('make read call');
  }
}
