import * as AlertActions from '../Actions/alert.actions';

export interface AlertState {
    message: string;
    tipo: AlertActions.tipoAlert;
}

const stateInit: AlertState = {
    message: '',
    tipo: null
};

export function AlertReducer(state = stateInit, action: AlertActions.actions): AlertState {
    switch (action.type) {
        case AlertActions.AlertActionTypes.setError:
            return { message: action.message, tipo: action.tipo };
        default:
            return state;
    }
}

