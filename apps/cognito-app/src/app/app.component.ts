import { Component, ChangeDetectorRef } from '@angular/core';
// Do we really need this? is it worth it?
import { CognitoUserInterface } from '@aws-amplify/ui-components';
import { HttpClient } from '@angular/common/http';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'kramerlabs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cognitoUser: CognitoUserInterface | null = null;

  // Can I use auth gaurd ? then via authguard utilize auth service?
  constructor(private ref: ChangeDetectorRef, private _http: HttpClient, _router: Router) {
    Auth.currentAuthenticatedUser().then(
      (user: any) => this.cognitoUser = user,
      _err => _router.navigate(['/login'])
    );
  }

  // Call auth service
  signOutClick() {
    Auth.signOut();
  }
}
