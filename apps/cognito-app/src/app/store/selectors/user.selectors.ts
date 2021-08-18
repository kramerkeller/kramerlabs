import { AuthState } from './../reducers/auth.reducers';
import { createFeatureSelector, createSelector } from "@ngrx/store";

// am I using this feature selector? What does it do?
export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectCurrentUser = createSelector(selectAuthState, (state: AuthState) => state.user);
export const selectLoggedIn = createSelector(selectAuthState, (state: AuthState) => state.loggedIn);
export const selectError = createSelector(selectAuthState, (state: AuthState) => state.error);
