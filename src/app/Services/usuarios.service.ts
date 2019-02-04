import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${Constants.API_ENDPOINT}/${Constants.PATH_USUARIOS}`);
  }

  createUsuarios(data: User): Observable<User> {
    return this.http.post<User>(`${Constants.API_ENDPOINT}/${Constants.PATH_USUARIOS}`, data);
  }
}
