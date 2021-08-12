import { Component } from '@angular/core';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { Auth } from 'aws-amplify';

@Component({
  selector: 'kramerlabs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor() {}

  googleLoginClick() {
    // This will automatically redirect via redirect url set in cognito
    // Call auth service
    Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})
    .then(() => Auth.currentAuthenticatedUser())
    .catch(e => console.log('Error:', e));
  }
}
