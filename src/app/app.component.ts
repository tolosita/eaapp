import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.initAlertListener();
  }

}
