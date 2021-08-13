import { createAction, props } from '@ngrx/store';
import { CognitoUserSession } from 'amazon-cognito-identity-js';


export const googleLogin = createAction('[User] Login via Google');
export const googleLoginSuccess = createAction('[User] Login via Google Success');
export const googleLoginFailure = createAction('[User] Login via Google Failure');

export const loadCognitoSession = createAction('[User] Load Cognito Session');
export const loadCognitoSessionSuccess = createAction('[User] Load Cognito Session Success');
// export const loadCognitoSessionSuccess = createAction('[User] Load Cognito Session Success', props<{session: CognitoUserSession}>());
export const loadCognitoSessionFailure = createAction('[User] Load Cognito Session Failure');

export const loadUser = createAction('[User] Load User');
