import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { AppConfig } from '../../app.config';
import { DataTableRequest } from '../models/datatable-request.model';
import { DataTableResponse } from '../models/datatable-reponse.model';


@Injectable()
export class BaseService {
  
  constructor(protected http: HttpClient, protected config: AppConfig, protected uri: string) { 
    
  }

  dataTablePaging(request: DataTableRequest) : Observable<DataTableResponse>{
    return this.http.post<DataTableResponse>(this.config.getConfig('endPoint') + this.uri + 'data-table-paging', request, {});
  }

}
