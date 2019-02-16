import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  isHandset$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
  }

}
