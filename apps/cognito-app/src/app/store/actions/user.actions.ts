import { createAction, props } from '@ngrx/store';

export const googleLogin = createAction('[User] Login via Google');
export const googleLoginSuccess = createAction('[User] Login via Google Success');
export const googleLoginFailure = createAction('[User] Login via Google Failure');

export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction('[User] Load User Success', props<{user: any}>());
export const loadUserFailure = createAction('[User] Load User Failure');

export const logoutUser = createAction('[User] User Sign Out');
export const logoutUserSuccess = createAction('[User] User Sign Out Success');
export const logoutUserFailure = createAction('[User] User Sign Out Failure');

