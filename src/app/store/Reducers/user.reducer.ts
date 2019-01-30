import * as UserActions from '../Actions/user.actions';

import { User } from '../../models/user.model';

export interface UserState {
    users: User[];
    user: User;
    isLoading: boolean;
}

const stateInit: UserState = {
    users: [],
    user: new User(),
    isLoading: false
};

export function UserReducer(state = stateInit, action: UserActions.actions): UserState {
    switch (action.type) {
        case UserActions.UserActionTypes.LoadUser:
            return { ...state, users: [], isLoading: true };
        case UserActions.UserActionTypes.LoadedUser:
            return { ...state, users: action.payload, isLoading: false };
        case UserActions.UserActionTypes.CreateUser:
            return { ...state, user: new User() };
        default:
            return state;
    }
}

