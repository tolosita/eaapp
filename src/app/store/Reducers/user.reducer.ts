import * as UserActions from '../Actions/user.actions';

import { User } from '../../models/user.model';
import { CreateUser } from '../Actions/user.actions';

export interface UserState {
    users: User[];
    isLoading: boolean;
    error: string;
    user: User;
}

const stateInit: UserState = {
    users: [],
    isLoading: false,
    error: null,
    user: null
};

export function UserReducer(state = stateInit, action: UserActions.actions): UserState {
    switch (action.type) {
        case UserActions.UserActionTypes.LoadUsers:
            return { ...state, users: [], isLoading: true };
        case UserActions.UserActionTypes.LoadedUser:
            return { ...state, user: action.payload, isLoading: false };
        case UserActions.UserActionTypes.LoadedUsers:
            return { ...state, users: action.payload, isLoading: false };
        case UserActions.UserActionTypes.CreateUser:
            return { ...state, user: null, error: null };
        case UserActions.UserActionTypes.ShowUser:
            return { ...state, isLoading: true, error: null };
        case UserActions.UserActionTypes.SaveUser:
            return { ...state, isLoading: true, error: null };
        case UserActions.UserActionTypes.ErrorUser:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
}
