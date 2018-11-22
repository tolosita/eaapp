import { Action } from '@ngrx/store';
import { User } from '../Models/user.model';

export enum AuthActionTypes {
    LoginUser = '[Auth] LOGIN_USER',
    LogoutUser = '[Auth] LOGOUT_USER',
    LoginUserError = '[Auth] LOGIN_USER_ERROR'
}

export class LoginUser implements Action {
    readonly type = AuthActionTypes.LoginUser;
    constructor(public user: User) { }
}

export class LoginUserError implements Action {
    readonly type = AuthActionTypes.LoginUserError;
    constructor(public error: string) { }
}

export class LogoutUser implements Action {
    readonly type = AuthActionTypes.LogoutUser;
}

export type actions = LoginUser | LogoutUser | LoginUserError;
