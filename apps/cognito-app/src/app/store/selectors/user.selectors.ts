import { AuthState } from './../reducers/auth.reducers';
import { createFeatureSelector, createSelector } from "@ngrx/store";

// am I using this feature selector? What does it do?
export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectLoggedIn = createSelector(selectAuthState, (state: AuthState) => state.isLoggedIn);
