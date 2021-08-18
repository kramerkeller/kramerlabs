import { UserFacade } from './../user.facade';
import {
  googleLogin,
  googleLoginSuccess,
  googleLoginFailure,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  logoutUserSuccess,
  logoutUserFailure,
  logoutUser,
} from './../actions/user.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {

  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _auth: AuthService
  ) {}

  // Update ofType for all logins or create general login action from other login types
  // Flash message? Is that possible with redirect?
  googleLogin$ = createEffect(() =>
    this._actions$.pipe(
      ofType(googleLogin),
      switchMap(() =>
        this._auth.googleLogin().pipe(
          // Why does switchMap work here, but not map?
          map(() => googleLoginSuccess()), // Dispatch load cognito session action
          catchError(() => of(googleLoginFailure())) // Redirect to login
        )
      )
    )
  );

  // maybe a login success flash message
  // Is that even possible with redirect and page refresh?
  loadUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadUser),
      switchMap(() =>
        this._auth.getUser().pipe(
          // Why does work here, but not above in googleLogin?
          map((user) => {
            console.log(user);
            return loadUserSuccess({user});
          }),
          catchError(() => of(loadUserFailure()))
        )
      )
    )
  );

  // Maybe error flash message
  failureRedirect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(googleLoginFailure, loadUserFailure),
      tap(() => this._router.navigate(['/login'])),
    ),
    { dispatch: false }
  );

  // maybe a logout flash message? would that even work with redirect? is redirect happening?
  // I think maybe aws sign out causes the refresh
  logoutUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(logoutUser),
      switchMap(() =>
        this._auth.signOut().pipe(
          // Why does switchMap work here, but not map?
          map(() => logoutUserSuccess()),
          catchError(() => of(logoutUserFailure()))
        )
      )
    )
  );
}

