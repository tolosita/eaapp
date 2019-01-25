import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './app.constants';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  getRequest(path: string, data: any = '') {
    const promise = new Promise((resolve, reject) => {
      this.http.get(`${Constants.API_ENDPOINT}/${path}${data}`)
        .toPromise()
        .then(
          resp => {
            resolve(resp);
          },
          error => {
            reject(error);
          },
        );
    });
    return promise;
  }

  putRequest(path: string, data: any) {
    const promise = new Promise((resolve, reject) => {
      this.http.put(`${Constants.API_ENDPOINT}/${path}`, data)
        .toPromise()
        .then(
          resp => {
            resolve(resp);
          },
          error => {
            reject(error);
          },
        );
    });
    return promise;
  }

  deleteRequest(path: string, data: any) {
    const promise = new Promise((resolve, reject) => {
      this.http.delete(`${Constants.API_ENDPOINT}/${path}/${data}`)
        .toPromise()
        .then(
          resp => {
            resolve(resp);
          },
          error => {
            reject(error);
          },
        );
    });
    return promise;
  }

}
