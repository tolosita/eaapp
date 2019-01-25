import * as AuthActions from '../Actions/auth.actions';
import { AuthActionTypes } from '../Actions/auth.actions';

import { User } from '../../models/user.model';

export interface AuthState {
    isAuthenticated: boolean;
    user: User;
    isLoading: boolean;
    error: string;
}

const stateInit: AuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null
};

export function AuthReducer(state = stateInit, action: AuthActions.actions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LoginUser:
            return { ...state, isLoading: true, error: null };
        case AuthActionTypes.LoggedUser:
            return { ...state, user: action.payload.user, isAuthenticated: true, isLoading: false };
        case AuthActionTypes.LoginUserError:
            return { ...state, error: action.payload, isLoading: false };
        case AuthActionTypes.LogoutUser:
            return { ...state, isAuthenticated: false, user: null };
        default:
            return state;
    }
}

