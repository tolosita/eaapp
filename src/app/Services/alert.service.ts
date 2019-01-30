import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessagesComponent } from '../pages/shared/dialog/messages/messages.component';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertSubcription: Subscription;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  initAlertListener() {
    this.alertSubcription = this.store.select('error')
      .pipe(filter(error => error.tipo !== null))
      .subscribe(error => {
        this.dialog.open(MessagesComponent, { data: error });
      });
  }

}
