import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { AuthService } from '../services/auth.service';
import { AppConfig } from '../../app.config';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private _auth: AuthService;
    private _router: Router;
    constructor(auth: AuthService, router: Router) {
        this._auth = auth;
        this._router = router;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header.
        if (this._auth.getToken() == null || this._auth.getToken() == '') {
            return next.handle(req).catch((error, caught) => {
                //intercept the respons error and displace it to the console
                console.log(error);
                //return the error to the method that called it
                return Observable.throw(error);
            }) as any;
        } else {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this._auth.getToken()}`
                }
            });
            //send the newly created request
            return next.handle(authReq).catch((error, caught) => {
                //intercept the respons error and displace it to the console
                console.log(error);
                //return the error to the method that called it
                return this.handleError(error);
            }) as any;
        }

    }

    handleError(error: HttpErrorResponse){
        if (error.status === 401 || error.status === 403) {
            this._router.navigate(['/home']);
            return typeof(null);
        }
        return typeof(error);
    }
}