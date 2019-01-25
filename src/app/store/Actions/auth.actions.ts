import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LoginUser = '[Auth] LOGIN_USER',
    LoggedUser = '[Auth] LOGGED_USER',
    LoginUserError = '[Auth] LOGIN_USER_ERROR',
    LogoutUser = '[Auth] LOGOUT_USER'
}

export class LoginUser implements Action {
    readonly type = AuthActionTypes.LoginUser;
    constructor(public payload: any) { }
}

export class LoggedUser implements Action {
    readonly type = AuthActionTypes.LoggedUser;
    constructor(public payload: any) { }
}

export class LoginUserError implements Action {
    readonly type = AuthActionTypes.LoginUserError;
    constructor(public payload: any) { }
}

export class LogoutUser implements Action {
    readonly type = AuthActionTypes.LogoutUser;
}

export type actions = LoginUser | LoggedUser | LoginUserError | LogoutUser;
