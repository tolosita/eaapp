import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constants';
import { Role } from '../models/role.model';

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    constructor(private http: HttpClient) { }

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(`${Constants.API_ENDPOINT}/${Constants.PATH_CARGOS}`);
    }
}
