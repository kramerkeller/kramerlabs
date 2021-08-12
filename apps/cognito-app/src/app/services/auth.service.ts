import { Injectable } from '@angular/core';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  googleLogin() {
    // This will automatically redirect via redirect url set in cognito
    Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})
    .then(() => Auth.currentAuthenticatedUser())
    .catch(e => console.log('Error:', e));

    // Return something? Make into observable?
  }

  signOut() {
    Auth.signOut();
  }
}
