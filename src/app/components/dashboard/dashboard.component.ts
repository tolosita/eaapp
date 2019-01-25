import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Subscription, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { SetPage } from '../../store/Actions/nav.actions';

const routes: any[] = [
  { path: '/', name: 'Inicio', icon: 'home', title: 'Inicio' },
  { path: '/usuarios', name: 'Usuarios', icon: 'people', title: 'Lista de Usuarios' }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  title: string;
  rutas: any[] = routes;
  user: User = new User();
  subscriptionNav: Subscription;
  subscriptionAuth: Subscription;
  isHandset$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
    this.subscriptionNav = this.store.select('nav').subscribe(nav => this.title = nav.page);
    this.subscriptionAuth = this.store.select('auth').subscribe(auth => this.user = new User()/* auth.user */);
    this.setRuta(routes.find(route => route.path === this.router.url).title);
  }

  ngOnDestroy(): void {
    this.subscriptionNav.unsubscribe();
    this.subscriptionAuth.unsubscribe();
  }

  setRuta(title: string) {
    this.store.dispatch(new SetPage(title));
  }

  logout() {
    this.authService.logout();
  }

}
