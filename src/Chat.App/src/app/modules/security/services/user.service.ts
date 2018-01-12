import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { DataTableResponse } from '../../../shared/models/datatable-reponse.model';
import { DataTableRequest } from '../../../shared/models/datatable-request.model';
import { UserViewModel } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  // getAndProcess(request: DataTableRequest) : Observable<DataTableResponse<UserViewModel>>{
  //   return this.http.post<DataTableResponse<UserViewModel>>('http://localhost:5456/api/values/get-and-process', request);
  // }
}
