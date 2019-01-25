import { Action } from '@ngrx/store';

export enum AlertActionTypes {
    setError = '[Alert] SET_ERROR'
}

export class SetError implements Action {
    readonly type = AlertActionTypes.setError;
    constructor(public message: string, public tipo: tipoAlert) { }
}

export type actions = SetError;
export type tipoAlert = 'info';
