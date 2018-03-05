import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header.
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
            return this.handleError(error);
        }) as any;

    }

    handleError(error: HttpErrorResponse){
        console.log('abc');
        if (error.status === 401 || error.status === 403) {
            this.router.navigate(['/home']);
            return typeof(null);
        }
        return typeof(error);
    }
}