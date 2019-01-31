import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as userActions from '../Actions/user.actions';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { SetError } from '../Actions/alert.actions';
import { UsuariosService } from '../../services/usuarios.service';
import { MatDialog } from '@angular/material';
import { UsuarioComponent } from '../../pages/shared/dialog/usuario/usuario.component';
import { Constants } from '../../app.constants';

@Injectable()
export class UserEffects {
    constructor(
        private dialog: MatDialog,
        private usuarioService: UsuariosService,
        private actions$: Actions
    ) { }

    @Effect()
    LoadUser$: Observable<Action> = this.actions$.pipe(
        ofType<userActions.LoadUsers>(userActions.UserActionTypes.LoadUsers),
        tap(data => console.log(userActions.UserActionTypes.LoadUsers, data)),
        mergeMap((action) =>
            this.usuarioService.getUsuarios()
                .pipe(
                    map((response) => {
                        return new userActions.LoadedUsers(response);
                    }),
                    catchError((error) => {
                        return of(new SetError(Constants[error.status], 'info'));
                    })
                )
        )
    );

    @Effect({ dispatch: false })
    LoadedUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.LoadedUsers),
        tap((data: userActions.LoadedUsers) => console.log(userActions.UserActionTypes.LoadedUsers, data))
    );

    @Effect({ dispatch: false })
    CreateUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.CreateUser),
        tap((data: userActions.CreateUser) => {
            this.dialog.open(UsuarioComponent, { data: 'Crear' });
            console.log(userActions.UserActionTypes.CreateUser, data);
        })
    );
}
