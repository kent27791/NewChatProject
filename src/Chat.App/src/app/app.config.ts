import { Inject, Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { inject } from '@angular/core/testing';

@Injectable()
export class AppConfig {
    private config: Object = null;
    private env:    Object = null;
    private _http: HttpClient;
    constructor(http: HttpClient) {
        this._http = http;
    }

    /**
     * Use to get the data found in the second file (config file)
     */
    getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Use to get the data found in the first file (env file)
     */
    getEnv(key: any) {
        return this.env[key];
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    load() {
        return new Promise((resolve, reject) => {
            this._http.get<any>('env.json').catch((error: any):any => {
                console.log('Configuration file "env.json" could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe( (envResponse) => {
                this.env = envResponse;
                let request:any = null;

                switch (envResponse.env) {
                    case 'production': {
                        request = this._http.get('config.' + envResponse.env + '.json');
                    } break;

                    case 'development': {
                        request = this._http.get('config.' + envResponse.env + '.json');
                    } break;

                    case 'default': {
                        console.error('Environment file is not set or invalid');
                        resolve(true);
                    } break;
                }
                if (request) {
                    request
                        .catch((error: any) => {
                            console.error('Error reading ' + envResponse.env + ' configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((responseData) => {
                            this.config = responseData;
                            resolve(true);
                        });
                } else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
            });

        });
    }
}