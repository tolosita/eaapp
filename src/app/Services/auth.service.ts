import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';
import { LoginUser, LogoutUser } from '../store/Actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../Store/app.reducer';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged: User;
  subscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.subscription = this.store.select('auth')
      .subscribe(aut => {
        this.logged = aut.user;
      });
  }

  login(user: User) {
    this.store.dispatch(new LoginUser(user));
    this.router.navigate(['/']);
  }

  logout() {
    this.router.navigate(['/login']);
    this.store.dispatch(new LogoutUser());
  }

  isAuth() {
    // if (this.logged == null) {
    //   this.router.navigate(['/login']);
    // }
    return true; // this.logged != null;
  }
}
