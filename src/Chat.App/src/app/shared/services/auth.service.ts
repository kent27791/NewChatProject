import { Injectable, Injector } from '@angular/core';
import { AppConfig } from '../../app.config';
@Injectable()
export class AuthService {
  private _config: AppConfig;
  constructor(config: AppConfig) {
      this._config = config;
  }

  public getToken(): string {
    //return localStorage.getItem(this.config.getConfig('jwtKey'));
    //console.log(this.config.jwtKey);
    console.log(this._config.getConfig('jwtKey'));
    return null;
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return false;
  } 

  

}
