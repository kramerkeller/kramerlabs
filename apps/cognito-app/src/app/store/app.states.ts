// maybe jsut put this in index.ts?

import { ActionReducerMap } from '@ngrx/store';
import { AuthState, reducer } from './reducers/auth.reducers';

export interface State {
  auth: AuthState
}

export const reducers: ActionReducerMap<State> = {
  auth: reducer
};

// to do for later
// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? []
//   : [];
