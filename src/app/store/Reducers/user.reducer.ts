import * as UserActions from '../Actions/user.actions';

import { User } from '../../models/user.model';

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
            return { ...state, user: new User(), error: null };
        case UserActions.UserActionTypes.ShowUser:
        case UserActions.UserActionTypes.SaveUser:
        case UserActions.UserActionTypes.EditUser:
        case UserActions.UserActionTypes.DeleteUser:
            return { ...state, isLoading: true, error: null };
        case UserActions.UserActionTypes.ErrorUser:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
}
