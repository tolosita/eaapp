import * as AuthActions from '../Actions/auth.actions';
import { AuthActionTypes } from '../Actions/auth.actions';

import { User } from '../Models/user.model';

export interface AuthState {
    user: User;
    error: string;
}

const stateInit: AuthState = {
    user: null,
    error: ''
};

export function AuthReducer(state = stateInit, action: AuthActions.actions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LoginUser:
            return { ...state, user: action.user };
        case AuthActionTypes.LoginUserError:
            return { ...state, error: action.error };
        case AuthActionTypes.LogoutUser:
            return { ...state, user: null };
        default:
            return state;
    }
}

