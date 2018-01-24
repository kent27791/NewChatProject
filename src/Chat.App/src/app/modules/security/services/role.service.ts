import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { DataTableRequest } from '../../../shared/models/datatable-request.model';
import { DataTableResponse } from '../../../shared/models/datatable-reponse.model';
import { AppConfig } from '../../../app.config';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient, private config: AppConfig) { }

  dataTablePaging(request: DataTableRequest) : Observable<DataTableResponse>{
    return this.http.post<DataTableResponse>(this.config.getConfig('endPoint') + 'api/roles/data-table-paging', request, {});
  }
}
