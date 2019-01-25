import { Injectable, Inject } from '@angular/core';
import { User } from '../Models/user.model';
import { LogoutUser } from '../store/Actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../Store/app.reducer';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    @Inject('LOCALSTORAGE') private localStorage: any
  ) { }

  getToken(): string {
    return this.localStorage.getItem('token');
  }

  isLoggedIn() {
    const token = this.getToken();
    return token != null;
  }

  login(user: User): Observable<any> {
    return this.http.post(`${Constants.API_ENDPOINT}/${Constants.PATH_LOGIN}`, user);
  }

  logout() {
    this.store.dispatch(new LogoutUser());
  }

}
