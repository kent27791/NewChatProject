import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable()
export class AuthService {
  constructor() {
    
  }

  public getToken(): string {
    return localStorage.getItem(environment.tokenName);
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return false;
  } 

  

}
