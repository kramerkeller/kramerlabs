import { tap, filter } from 'rxjs/operators';
import { UserFacade } from './../store/user.facade';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

// Shouls this be providedIn: root?
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _user: UserFacade) {}

  canActivate() {
    return this._user.loggedIn$.pipe(
      tap(isLoggedIn => {
        if(!isLoggedIn) {
          this._user.loadUser();
        }
      }),
      filter(isLoggedIn => isLoggedIn)
    )
  }
}
