import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessagesComponent } from '../components/shared/dialog/messages/messages.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public dialog: MatDialog) { }

  openDialog(error) {
    console.log(error);
    this.dialog.open(MessagesComponent, { data: error });
  }
}
