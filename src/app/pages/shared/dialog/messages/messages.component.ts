import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styles: []
})
export class MessagesComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

}
