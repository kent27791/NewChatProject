import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { DataTableResponse } from '../../../shared/models/datatable-reponse.model';
import { DataTableRequest } from '../../../shared/models/datatable-request.model';
import { UserViewModel } from '../models/user.model';
import { AppConfig } from '../../../app.config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private config: AppConfig) { }

  getAndProcess(request: DataTableRequest) : Observable<DataTableResponse>{
    return this.http.post<DataTableResponse>(this.config.getConfig('endPoint') + 'api/values/get-and-process', request, {});
  }
}
