import { Action } from '@ngrx/store';

export enum ClientActionTypes {
    LoadClients = '[Client] LOAD_CLIENTS',
    LoadedClient = '[Client] LOADED_CLIENT',
    LoadedClients = '[Client] LOADED_CLIENTS',
    CreateClient = '[Client] CREATE_CLIENT',
    ShowClient = '[Client] SHOW_CLIENT',
    SaveClient = '[Client] SAVE_CLIENT',
    EditClient = '[Client] EDIT_CLIENT',
    DeleteClient = '[Client] DELETE_CLIENT',
    ErrorClient = '[Client] ERROR_CLIENT'
}

export class LoadClients implements Action {
    readonly type = ClientActionTypes.LoadClients;
}

export class LoadedClients implements Action {
    readonly type = ClientActionTypes.LoadedClients;
    constructor(public payload: any) { }
}

export class CreateClient implements Action {
    readonly type = ClientActionTypes.CreateClient;
}

export class ShowClient implements Action {
    readonly type = ClientActionTypes.ShowClient;
    constructor(public payload: any) { }
}

export class LoadedClient implements Action {
    readonly type = ClientActionTypes.LoadedClient;
    constructor(public payload: any) { }
}

export class SaveClient implements Action {
    readonly type = ClientActionTypes.SaveClient;
    constructor(public payload: any) { }
}

export class EditClient implements Action {
    readonly type = ClientActionTypes.EditClient;
    constructor(public payload: any) { }
}

export class DeleteClient implements Action {
    readonly type = ClientActionTypes.DeleteClient;
    constructor(public payload: any) { }
}

export class ErrorClient implements Action {
    readonly type = ClientActionTypes.ErrorClient;
    constructor(public payload: any) { }
}

export type actions = LoadClients | LoadedClients | CreateClient | ShowClient | LoadedClient
    | SaveClient | EditClient | DeleteClient | ErrorClient;
