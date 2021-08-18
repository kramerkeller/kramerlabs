import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { googleLogin, loadUser, logoutUser } from './actions/user.actions';
import { selectLoggedIn, selectCurrentUser, selectError } from './selectors/user.selectors';

@Injectable()
export class UserFacade {
  constructor(private _store: Store) {}

  currentUser$ = this._store.select(selectCurrentUser);
  loggedIn$ = this._store.select(selectLoggedIn);
  error$ = this._store.select(selectError);

  googleLogin() {
    this._dispatch(googleLogin());
  }

  loadUser() {
    this._dispatch(loadUser());
  }

  // Good for requests that need an observable to complete as opposed to triggering a new HTTP request
  loggedInOnce() {
    return this.loggedIn$.pipe(first());
  }

  logoutUser() {
    this._dispatch(logoutUser());
  }

  private _dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
