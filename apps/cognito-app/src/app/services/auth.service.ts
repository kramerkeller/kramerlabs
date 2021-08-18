import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { Auth } from 'aws-amplify';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  getToken() {
    return from(Auth.currentSession()).pipe(
      map((session) => session.getIdToken().getJwtToken())
    );
  }

  getUser() {
    return from(Auth.currentSession()).pipe(
      switchMap((session) => {
        const token = session.getIdToken().getJwtToken();
        const url = 'http://localhost:4200/api/users/';
        return this._http.get(url, {headers: {token}}).pipe(
          map((userInfo) => ({ token, ...userInfo }))
        )
      })
    )
  }

  googleLogin() {
    return from(Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google}));
  }

  signOut() {
    return from(Auth.signOut());
  }
}
