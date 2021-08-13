import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { Auth } from 'aws-amplify';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient, private _router: Router) {}

  // Dispatch Session Login Action
  async getToken() {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  }

  loadCognitoUser() {
    Auth.currentSession().then(session => {
      return  session.getIdToken().getJwtToken();
    },
    _err => {
      console.log('Error:', _err)
      this._router.navigate(['/login'])
    });
  }

  loadCognitoSession() {
    // TODO: First check store for user, if not there, THEN check aws session
    return from(Auth.currentSession());
  }

  loadUserState(token: string, id: string) {
    const url = 'http://localhost:4200/api/users/' + id;
    const headers = {"token": token}
    // Make this when you Load User
    this._http.get(url, {headers}).subscribe((response) => console.log('user db', response));
    return this._http.get(url, {headers});
  }

  // Call via loadUser action, then on success load user, on failtu
  loadUser() {
    const url = 'http://localhost:4200/api/users/7be4e856-fb5b-4cba-aaf0-fd1bbd80da45';
    // Could just pass in token from  or call this above
    Auth.currentSession().then(session => {
      // TODO: Replace all this with an interceptor that does this
      console.log('session', session);
      const token = session.getIdToken().getJwtToken();
      const headers = {"token": token}
      // Make this when you Load User
      this._http.get(url, {headers}).subscribe((response) => console.log('user db', response));
      // TODO: Take abover response, even better, take observable and dispatch action
    },
    _err => {
      console.log('Error:', _err)
      this._router.navigate(['/login'])
    });
  }

  getUserInfo() {
    const url = 'http://localhost:4200/api/users/7be4e856-fb5b-4cba-aaf0-fd1bbd80da45';
    Auth.currentSession().then(session => {
      // TODO: Replace all this with an interceptor that does this
      const token = session.getIdToken().getJwtToken();
      const headers = {"token": token}
      this._http.get(url, {headers}).subscribe((response) => console.log(response));
    });
  }

  // Dispatch Google Login Action - Thenn Success and Then Failure
  googleLogin() {
    // This will automatically redirect via redirect url set in cognito
    return from(Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google}));
    // .then(() => Auth.currentAuthenticatedUser())
    // .catch(e => console.log('Error:', e));

    // Return something? Make into observable?
  }

  signOut() {
    Auth.signOut();
  }
}
