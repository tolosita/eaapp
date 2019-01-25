import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { $ } from 'protractor';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        return next.handle(
            req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        );
    }
}
