import * as UserActions from '../Actions/user.actions';

import { User } from '../../models/user.model';

export interface UserState {
    users: User[];
    isLoading: boolean;
}

const stateInit: UserState = {
    users: [],
    isLoading: false
};

export function UserReducer(state = stateInit, action: UserActions.actions): UserState {
    switch (action.type) {
        case UserActions.UserActionTypes.LoadUsers:
            return { ...state, users: [], isLoading: true };
        case UserActions.UserActionTypes.LoadedUsers:
            return { ...state, users: action.payload, isLoading: false };
        case UserActions.UserActionTypes.SaveUser:
            return { ...state, isLoading: true };
        default:
            return state;
    }
}

