import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { AppConfig } from '../../app.config';
import { DataTableRequest } from '../models/datatable-request.model';
import { DataTableResponse } from '../models/datatable-reponse.model';


@Injectable()
export class BaseService {
  protected _endPoint: string;
  constructor(protected http: HttpClient, protected config: AppConfig, protected uri: string) {
    this._endPoint = this.config.getConfig('endPoint');
  }

  dataTablePaging(request: DataTableRequest) : Observable<DataTableResponse>{
    return this.http.post<DataTableResponse>(this._endPoint + this.uri + 'data-table-paging', request, {});
  }

  find(id: any): any{
    return this.http.get<any>(this._endPoint + this.uri + 'find/' + id);
  }

  create(viewModel: any): any{
    return this.http.post<any>(this._endPoint + this.uri + 'create', viewModel);
  }

  edit(id: any, viewModel: any){
    return this.http.put(this._endPoint + this.uri + 'edit/' + id, viewModel);
  }

  delete(id: any){
    return this.http.delete(this._endPoint + this.uri + 'delete/' + id);
  }
}
