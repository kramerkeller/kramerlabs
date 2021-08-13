import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { googleLogin, loadCognitoSession } from './actions/user.actions';

@Injectable()
export class UserFacade {
  constructor(private _store: Store) {}

  googleLogin() {
    this._dispatch(googleLogin());
  }

  loadCognitoSession() {
    this._dispatch(loadCognitoSession());
  }

  private _dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
