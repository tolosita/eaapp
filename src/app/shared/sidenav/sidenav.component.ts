import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
declare var M: any;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styles: []
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') sidnavRef: ElementRef;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    M.Sidenav.init(this.sidnavRef.nativeElement);
  }

  logout() {
    this.authService.logout();
  }

}
