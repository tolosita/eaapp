import * as AuthActions from '../Actions/auth.actions';

import { User } from '../../models/user.model';

export interface AuthState {
    isAuthenticated: boolean;
    user: User;
    isLoading: boolean;
    error: any;
}

const stateInit: AuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null
};

export function AuthReducer(state = stateInit, action: AuthActions.actions): AuthState {
    switch (action.type) {
        case AuthActions.AuthActionTypes.LoginUser:
            return { ...state, isLoading: true, error: null };
        case AuthActions.AuthActionTypes.LoggedUser:
            return { ...state, user: action.payload.user, isAuthenticated: true, isLoading: false };
        case AuthActions.AuthActionTypes.LoginUserError:
            return { ...state, error: action.payload, isLoading: false };
        case AuthActions.AuthActionTypes.LogoutUser:
            return { ...state, isAuthenticated: false, user: null };
        default:
            return state;
    }
}

