import { Action } from '@ngrx/store';

export enum UserActionTypes {
    LoadUsers = '[User] LOAD_USERS',
    LoadedUser = '[User] LOADED_USER',
    LoadedUsers = '[User] LOADED_USERS',
    CreateUser = '[User] CREATE_USER',
    ShowUser = '[User] SHOW_USER',
    SaveUser = '[User] SAVE_USER',
    ErrorUser = '[User] ERROR_USER'
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

export class ShowUser implements Action {
    readonly type = UserActionTypes.ShowUser;
    constructor(public payload: any) { }
}

export class LoadedUser implements Action {
    readonly type = UserActionTypes.LoadedUser;
    constructor(public payload: any) { }
}

export class SaveUser implements Action {
    readonly type = UserActionTypes.SaveUser;
    constructor(public payload: any) { }
}

export class ErrorUser implements Action {
    readonly type = UserActionTypes.ErrorUser;
    constructor(public payload: any) { }
}

export type actions = LoadUsers | LoadedUsers | CreateUser | ShowUser | LoadedUser | SaveUser | ErrorUser;
