import { UserFacade } from './../user.facade';
import {
  googleLogin,
  googleLoginSuccess,
  googleLoginFailure,
  loadCognitoSession,
  loadCognitoSessionSuccess,
  loadCognitoSessionFailure,
} from './../actions/user.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { inflate } from 'node:zlib';
import { info } from 'node:console';

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
          switchMap(() => of(googleLoginSuccess())), // Dispatch load cognito session action
          catchError(() => of(googleLoginFailure())) // Redirect to login
        )
      )
    )
  );

  // Since these are all promise based events from cognito, should i have retries?
  loadCognitoSession$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadCognitoSession),
      switchMap(() =>
        from(this._auth.loadCognitoSession()).pipe(
          switchMap((session) => {
            console.log(session);
            const token = session.getIdToken().getJwtToken();
            const id = session.getIdToken().payload.sub;
            const userInfo = this._auth.loadUserState(token, id);
            userInfo.subscribe((info) => console.log(info));
            return of(loadCognitoSessionSuccess());
          }),
          catchError(() => of(loadCognitoSessionFailure()))
        )
      )
    )
  );

  // loadUser$ = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(loadCognitoSessionSuccess),
  //     switchMap((action) => {
  //       const token = action.session.getIdToken().getJwtToken();
  //       const id = action.session.getIdToken().payload.sub;
  //       this._auth.loadUserState(token, id);
  //       return of(googleLoginSuccess());
  //     }),
  //     catchError(() => of(loadCognitoSessionFailure()))
  //   )
  // );

  // Maybe have a flash error message here too?
  failureRedirect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(googleLoginFailure, loadCognitoSessionFailure),
      tap(() => this._router.navigate(['/login'])),
    ),
    { dispatch: false }
  );
}

