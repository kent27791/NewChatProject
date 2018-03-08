import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  private uri = 'api/security/';
  private _endPoint;
  constructor(private router: Router, private http: HttpClient) {
    this._endPoint = environment.endPoint;
  }

  getToken(): string {
    return localStorage.getItem(environment.tokenName);
  }

  isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return false;
  }

  signIn(userSignIn: object){
    return this.http.post<any>(this._endPoint + this.uri + 'sign-in/', userSignIn, {});
  }

  signUp(userSignUp: object){
    return this.http.post<any>(this._endPoint + this.uri + 'sign-up/', userSignUp, {});
  }

  logOut() {
    localStorage.removeItem(environment.tokenName);
    this.router.navigate(['/authentication/sign-in']);
  }



}
