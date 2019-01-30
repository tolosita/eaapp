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

@Injectable()
export class UserEffects {
    constructor(
        private dialog: MatDialog,
        private usuarioService: UsuariosService,
        private actions$: Actions
    ) { }

    @Effect()
    LoadUser$: Observable<Action> = this.actions$.pipe(
        ofType<userActions.LoadUser>(userActions.UserActionTypes.LoadUser),
        tap(data => console.log(userActions.UserActionTypes.LoadUser, data)),
        mergeMap((action) =>
            this.usuarioService.getUsuarios()
                .pipe(
                    map((response) => {
                        return new userActions.LoadedUser(response);
                    }),
                    catchError((error) => {
                        return of(new SetError(error, 'info'));
                    })
                )
        )
    );

    @Effect({ dispatch: false })
    LoadedUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.LoadedUser),
        tap((data: userActions.LoadedUser) => console.log(userActions.UserActionTypes.LoadedUser, data))
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
