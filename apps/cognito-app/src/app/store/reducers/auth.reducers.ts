import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/users';
import { loadUser, loadUserFailure, loadUserSuccess, logoutUser } from '../actions/user.actions';

export interface AuthState {
  // is a user authenticated?
  isLoggedIn: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // for loading bar
  loading: boolean;
  // for loading bar
  loaded: boolean;
  // error message
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  loaded: false,
  errorMessage: null,
};

export const reducer = createReducer(
  initialState,
  on(loadUser, (state) => ({...state, loading: true, loaded: false, errorMessage: null})),
  on(loadUserSuccess, (state, {user}) => ({
    ...state,
    isLoggedIn: true,
    user,
    loading: false,
    loaded: true,
    errorMessage: null
  })),
  on(logoutUser, () => initialState)
);
