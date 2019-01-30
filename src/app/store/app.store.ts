import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './Reducers/auth.reducer';
import { AuthEffects } from './Effects/auth.effects';
import * as fromUser from './Reducers/user.reducer';
import { UserEffects } from './Effects/user.effects';
import * as fromAlert from './Reducers/alert.reducer';

export interface AppState {
    auth: fromAuth.AuthState;
    error: fromAlert.AlertState;
    users: fromUser.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: fromAuth.AuthReducer,
    error: fromAlert.AlertReducer,
    users: fromUser.UserReducer
};

export const appEffects = [
    AuthEffects,
    UserEffects
];
