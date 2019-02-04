import { Action } from '@ngrx/store';

export enum UserActionTypes {
    LoadUsers = '[User] LOAD_USERS',
    LoadedUsers = '[User] LOADED_USERS',
    CreateUser = '[User] CREATED_USER',
    SaveUser = '[User] SAVE_USER'
}

export class LoadUsers implements Action {
    readonly type = UserActionTypes.LoadUsers;
}

export class LoadedUsers implements Action {
    readonly type = UserActionTypes.LoadedUsers;
    constructor(public payload: any) { }
}

export class CreateUser implements Action {
    readonly type = UserActionTypes.CreateUser;
}

export class SaveUser implements Action {
    readonly type = UserActionTypes.SaveUser;
    constructor(public payload: any) { }
}

export type actions = LoadUsers | LoadedUsers | CreateUser | SaveUser;
