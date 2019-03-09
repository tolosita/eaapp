import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as garantiaActions from '../Actions/garantia.actions';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { ThrowError } from '../Actions/alert.actions';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Constants } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Garantia } from 'src/app/models/garantia.model';
import { AppState } from '../app.store';
import { Router } from '@angular/router';

@Injectable()
export class GarantiaEffects {
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<AppState>
    ) { }

    @Effect()
    LoadGarantia$: Observable<Action> = this.actions$.pipe(
        ofType<garantiaActions.LoadGarantias>(garantiaActions.GarantiaActionTypes.LoadGarantias),
        tap(data => console.log(garantiaActions.GarantiaActionTypes.LoadGarantias, data)),
        mergeMap((action) =>
            this.http.get<Garantia[]>(`${Constants.API_ENDPOINT}/${Constants.PATH_GARANTIAS}`)
                .pipe(
                    map((response) => {
                        return new garantiaActions.LoadedGarantias(response);
                    }),
                    catchError((reject) => {
                        return of(new ThrowError(reject));
                    })
                )
        )
    );

    @Effect({ dispatch: false })
    LoadedGarantias$: Observable<Action> = this.actions$.pipe(
        ofType(garantiaActions.GarantiaActionTypes.LoadedGarantias),
        tap((data: garantiaActions.LoadedGarantias) => console.log(garantiaActions.GarantiaActionTypes.LoadedGarantias, data))
    );

    @Effect()
    ShowGarantia$: Observable<Action> = this.actions$.pipe(
        ofType(garantiaActions.GarantiaActionTypes.ShowGarantia),
        tap(data => console.log(garantiaActions.GarantiaActionTypes.ShowGarantia, data)),
        mergeMap((action: garantiaActions.ShowGarantia) =>
            this.http.get<Garantia>(`${Constants.API_ENDPOINT}/${Constants.PATH_GARANTIAS}/${action.payload}`)
                .pipe(
                    map((response) => {
                        return new garantiaActions.LoadedGarantia(response);
                    }),
                    catchError((reject) => {
                        return of(new ThrowError(reject));
                    })
                )
        )
    );

    @Effect({ dispatch: false })
    SaveGarantia$: Observable<Action> = this.actions$.pipe(
        ofType<garantiaActions.SaveGarantia>(garantiaActions.GarantiaActionTypes.SaveGarantia),
        tap((data: garantiaActions.SaveGarantia) => {
            console.log(garantiaActions.GarantiaActionTypes.SaveGarantia, data);
            this.http.post(`${Constants.API_ENDPOINT}/${Constants.PATH_GARANTIAS}`, data.payload)
                .subscribe((response: Garantia) => {
                    data.payload.referencias.forEach(element => {
                        this.http.post(`${Constants.API_ENDPOINT}/${Constants.PATH_REFERENCIAS}/${response.id}`, element).subscribe();
                    });
                    data.payload.causas.forEach(element => {
                        this.http.post(`${Constants.API_ENDPOINT}/${Constants.PATH_CAUSAS}/${response.id}`, element).subscribe();
                    });
                    this.snackBar.open(Constants.CREATE_SUCCES, Constants.BTN_OK, { duration: 3000 });
                    this.router.navigate(['garantias']);
                });
        })
    );

    @Effect({ dispatch: false })
    EditGarantia$: Observable<Action> = this.actions$.pipe(
        ofType<garantiaActions.EditGarantia>(garantiaActions.GarantiaActionTypes.EditGarantia),
        tap((data: garantiaActions.EditGarantia) => {
            console.log(garantiaActions.GarantiaActionTypes.EditGarantia, data);
            this.http.put(`${Constants.API_ENDPOINT}/${Constants.PATH_GARANTIAS}/${data.payload.id}`, data.payload)
                .subscribe((response: Garantia) => {
                    data.payload.referencias.forEach(element => {
                        this.http.post(`${Constants.API_ENDPOINT}/${Constants.PATH_REFERENCIAS}/${response.id}`, element).subscribe();
                    });
                    data.payload.causas.forEach(element => {
                        this.http.post(`${Constants.API_ENDPOINT}/${Constants.PATH_CAUSAS}/${response.id}`, element).subscribe();
                    });
                    this.snackBar.open(Constants.UPDATE_SUCCES, Constants.BTN_OK, { duration: 3000 });
                    this.router.navigate(['garantias']);
                });
        })
    );

    @Effect()
    DeleteGarantia$: Observable<Action> = this.actions$.pipe(
        ofType<garantiaActions.DeleteGarantia>(garantiaActions.GarantiaActionTypes.DeleteGarantia),
        tap((data: garantiaActions.DeleteGarantia) => console.log(garantiaActions.GarantiaActionTypes.DeleteGarantia, data)),
        mergeMap((action) =>
            this.http.delete(`${Constants.API_ENDPOINT}/${Constants.PATH_GARANTIAS}/${action.payload}`)
                .pipe(
                    map((response) => {
                        this.dialog.closeAll();
                        this.snackBar.open(Constants.DELETE_SUCCES, Constants.BTN_OK, { duration: 3000 });
                        return new garantiaActions.LoadGarantias();
                    }),
                    catchError((reject) => {
                        return of(new ThrowError(reject));
                    })
                )
        )
    );
}
