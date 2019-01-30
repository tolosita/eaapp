import { Action } from '@ngrx/store';

export enum UserActionTypes {
    LoadUser = '[User] LOAD_USER',
    LoadedUser = '[User] LOADED_USER',
    CreateUser = '[User] CREATED_USER'
}

export class LoadUser implements Action {
    readonly type = UserActionTypes.LoadUser;
}

export class LoadedUser implements Action {
    readonly type = UserActionTypes.LoadedUser;
    constructor(public payload: any) { }
}

export class CreateUser implements Action {
    readonly type = UserActionTypes.CreateUser;
}

export type actions = LoadUser | LoadedUser | CreateUser;
