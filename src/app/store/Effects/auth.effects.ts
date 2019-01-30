import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authActions from '../Actions/auth.actions';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.store';
import { SetError } from '../Actions/alert.actions';
import { Constants } from '../../app.constants';

@Injectable()
export class AuthEffects {

    constructor(
        private router: Router,
        private authService: AuthService,
        private actions$: Actions,
        private store: Store<AppState>,
        @Inject('LOCALSTORAGE') private localStorage: any
    ) { }

    @Effect()
    LoginUser$: Observable<Action> = this.actions$.pipe(
        ofType<authActions.LoginUser>(authActions.AuthActionTypes.LoginUser),
        tap(data => console.log(authActions.AuthActionTypes.LoginUser, data)),
        mergeMap((action) =>
            this.authService.login(action.payload)
                .pipe(
                    map((response) => {
                        return new authActions.LoggedUser(response);
                    }),
                    catchError((reject) => {
                        const error = {
                            status: reject.status,
                            message: this.getMessageError(reject.error.message)
                        };
                        return of(new authActions.LoginUserError(error));
                    })
                )
        )
    );

    @Effect({ dispatch: false })
    LoggedUser$: Observable<Action> = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.LoggedUser),
        tap((data: authActions.LoggedUser) => {
            this.localStorage.setItem('token', data.payload.token);
            this.router.navigate(['/']);
            console.log(authActions.AuthActionTypes.LoggedUser, data);
        })
    );

    @Effect({ dispatch: false })
    LoginUserError: Observable<any> = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.LoginUserError),
        tap(data => {
            if (!data.payload.status) {
                this.store.dispatch(new SetError(Constants[data.payload.status], 'info'));
            }
            console.log(authActions.AuthActionTypes.LoginUserError, data);
        })
    );

    @Effect({ dispatch: false })
    LogoutUser: Observable<any> = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.LogoutUser),
        tap((data) => {
            this.router.navigate(['login']);
            this.localStorage.removeItem('token');
            console.log(authActions.AuthActionTypes.LogoutUser, data);
        })
    );

    getMessageError(error: String): String {
        return error === 'Bad credentials' ? Constants[402] :
            error === 'User is disabled' ? Constants[401] :
                null;
    }

}
