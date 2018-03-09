import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs';
import { DataTableRequest } from '../../../shared/models/datatable-request.model';
import { DataTableResponse } from '../../../shared/models/datatable-reponse.model';
@Injectable()
export class PageService extends BaseService {
  constructor(http: HttpClient) {
    super(http, 'api/page/');
  }

  tree(type: number): any {
    return this.http.get(this._endPoint + this.uri + 'tree/' + type);
  }

  userGrantDataTablePaging(id: number, request: DataTableRequest): Observable<DataTableResponse> {
    return this.http.post<DataTableResponse>(this._endPoint + this.uri + 'user-grant-data-table-paging/' + id, request, {});
  }

  grantUserPermission(userId: number, pageId: number) {
    return this.http.get(this._endPoint + this.uri + 'grant-user-permission/' + userId, { params: { pageId: pageId.toString() } });
  }

  denyUserPermission(userId: number, pageId: number) {
    return this.http.get(this._endPoint + this.uri + 'deny-user-permission/' + userId, { params: { pageId: pageId.toString() } });
  }
}
