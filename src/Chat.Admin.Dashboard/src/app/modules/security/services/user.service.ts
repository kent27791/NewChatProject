import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';
import { DataTableRequest } from '../../../shared/models/datatable-request.model';
import { DataTableResponse } from '../../../shared/models/datatable-reponse.model';
import { Observable } from 'rxjs';
@Injectable()
export class UserService extends BaseService{
  constructor(http: HttpClient){
    super(http, 'api/user/');
  }

  roleGrantDataTablePaging(id: number, request: DataTableRequest): Observable<DataTableResponse> {
    return this.http.post<DataTableResponse>(this._endPoint + this.uri + 'role-grant-data-table-paging/' + id, request, {});
  }

  grantRole(userId: number, roleId: number) {
    return this.http.get(this._endPoint + this.uri + 'grant-role/' + roleId, { params: { userId: userId.toString() } });
  }

  denyRole(userId: number, roleId: number) {
    return this.http.get(this._endPoint + this.uri + 'deny-role/' + roleId, { params: { userId: userId.toString() } });
  }
}
