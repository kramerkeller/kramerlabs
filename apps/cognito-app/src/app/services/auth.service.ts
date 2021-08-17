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

  loadUser() {
    // Check Cognito Auth for user
    return from(Auth.currentSession()).pipe(
      switchMap((session) => {
        // Once the ID is stored in the backend (is it?) Then this may not matter, maybe user should have toke and
        const token = session.getIdToken().getJwtToken();
        const id = session.getIdToken().payload.sub;
        // Probably a safer way to do this than appending the id as string
        const url = 'http://localhost:4200/api/users/' + id;
        return this._http.get(url, {headers: {token}}).pipe(
          map((userInfo) => ({ token, id, ...userInfo }))
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
