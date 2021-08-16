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
    private _userFacade: UserFacade,
    private _router: Router,
    private _auth: AuthService
  ) {}

  // Update ofType for all logins or create general login action from other login types
  googleLogin$ = createEffect(() =>
    this._actions$.pipe(
      ofType(googleLogin),
      switchMap(() =>
        this._auth.googleLogin().pipe(
          // Why does switchMap work here, but not map?
          switchMap(() => of(googleLoginSuccess())), // Dispatch load cognito session action
          catchError(() => of(googleLoginFailure())) // Redirect to login
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadUser),
      switchMap(() =>
        this._auth.loadUser().pipe(
          // Why does work here, but not above in googleLogin?
          map((user) => loadUserSuccess({user})),
          catchError(() => of(loadUserFailure()))
        )
      )
    )
  );

  // Maybe have a flash error message here too?
  failureRedirect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(googleLoginFailure, loadUserFailure),
      tap(() => this._router.navigate(['/login'])),
    ),
    { dispatch: false }
  );

  // What should I do on failure? retry?
  // On either one of these I should clear authenticated user in store right?
  logoutUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(logoutUser),
      switchMap(() =>
        this._auth.signOut().pipe(
          // Why does switchMap work here, but not map?
          switchMap(() => of(logoutUserSuccess())),
          catchError(() => of(logoutUserFailure()))
        )
      )
    )
  );
}

