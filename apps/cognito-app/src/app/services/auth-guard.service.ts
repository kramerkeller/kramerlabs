import { map, tap, switchMap, filter, skip, takeUntil } from 'rxjs/operators';
import { UserFacade } from './../store/user.facade';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of, race } from 'rxjs';

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
