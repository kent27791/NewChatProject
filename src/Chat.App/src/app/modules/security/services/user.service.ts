import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class UserService extends BaseService{
  constructor(http: HttpClient){
    super(http, 'api/user/');
  }
}
