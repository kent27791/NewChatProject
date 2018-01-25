import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../../../app.config';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class UserService extends BaseService{
  constructor(http: HttpClient, config: AppConfig){
    super(http, config, 'api/user/');
  }
}
