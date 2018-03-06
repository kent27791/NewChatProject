import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../modules/authentication/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {
        this.ajaxInterceptor();
    }

    getToken(): string {
        return localStorage.getItem(environment.tokenName);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header.
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.getToken()}`
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

    handleError(error: HttpErrorResponse) {
        if (error.status === 401 || error.status === 403) {
            this.router.navigate(['/authentication/sign-in']);
            //return typeof(error);
            return Observable.throw(error);
        }
        return Observable.throw(error);
    }

    ajaxInterceptor() {
        let self = this;
        $.ajaxSetup({
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + this.getToken());
            },
            error: function (jqXHR, textStatus) {
                if (jqXHR.status === 401) {
                    self.router.navigate(['/authentication/sign-in']);
                }
                console.log(jqXHR.statusText)
            }
        })
    }
}