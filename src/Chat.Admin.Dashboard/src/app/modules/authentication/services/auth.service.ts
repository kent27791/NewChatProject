import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthService {
  base = '/api/security/';
  constructor(private http: HttpClient) {

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

  signIn() {

  }



}
