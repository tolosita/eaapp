import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

const routes: any[] = [
  { path: '/', name: 'Inicio', icon: 'home' },
  { path: '/usuarios', name: 'Usuarios', icon: 'people', }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  rutas: any[] = routes;
  user: User = new User();
  subscriptionAuth: Subscription;
  isHandset$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
    this.subscriptionAuth = this.store.select('auth').subscribe(auth => this.user = new User()/* auth.user */);
  }

  ngOnDestroy(): void {
    this.subscriptionAuth.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
