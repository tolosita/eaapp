import * as ClientActions from '../Actions/client.actions';

import { Client } from '../../models/client.model';

export interface ClientState {
    clients: Client[];
    isLoading: boolean;
    error: string;
    client: Client;
}

const stateInit: ClientState = {
    clients: [],
    isLoading: false,
    error: null,
    client: null
};

export function ClientReducer(state = stateInit, action: ClientActions.actions): ClientState {
    switch (action.type) {
        case ClientActions.ClientActionTypes.LoadClients:
            return { ...state, clients: [], isLoading: true };
        case ClientActions.ClientActionTypes.LoadedClient:
            return { ...state, client: action.payload, isLoading: false };
        case ClientActions.ClientActionTypes.LoadedClients:
            return { ...state, clients: action.payload, isLoading: false };
        case ClientActions.ClientActionTypes.CreateClient:
            return { ...state, client: new Client(), error: null };
        case ClientActions.ClientActionTypes.ShowClient:
        case ClientActions.ClientActionTypes.SaveClient:
        case ClientActions.ClientActionTypes.EditClient:
        case ClientActions.ClientActionTypes.DeleteClient:
            return { ...state, isLoading: true, error: null };
        case ClientActions.ClientActionTypes.ErrorClient:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
}
