import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { googleLogin, loadUser, logoutUser } from './actions/user.actions';
import { selectLoggedIn} from './selectors/user.selectors';

@Injectable()
export class UserFacade {
  constructor(private _store: Store) {}

  $loggedIn = this._store.select(selectLoggedIn);

  googleLogin() {
    this._dispatch(googleLogin());
  }

  loadUser() {
    this._dispatch(loadUser());
  }

  logoutUser() {
    this._dispatch(logoutUser());
  }

  private _dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
