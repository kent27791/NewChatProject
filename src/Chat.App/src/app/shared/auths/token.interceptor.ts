import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { AuthService } from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header.
        if (this.auth.getToken() == null || this.auth.getToken() == '') {
            return next.handle(req).catch((error, caught) => {
                //intercept the respons error and displace it to the console
                console.log(error);
                //return the error to the method that called it
                return Observable.throw(error);
            }) as any;
        } else {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                }
            });
            //send the newly created request
            return next.handle(authReq).catch((error, caught) => {
                //intercept the respons error and displace it to the console
                console.log(error);
                //return the error to the method that called it
                return Observable.throw(error);
            }) as any;
        }

    }
}