import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './Reducers/auth.reducer';
import * as fromNav from './Reducers/nav.reducer';
import * as fromAlert from './Reducers/alert.reducer';

export interface AppState {
    auth: fromAuth.AuthState;
    nav: fromNav.NavState;
    error: fromAlert.AlertState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: fromAuth.AuthReducer,
    nav: fromNav.NavReducer,
    error: fromAlert.AlertReducer
};

