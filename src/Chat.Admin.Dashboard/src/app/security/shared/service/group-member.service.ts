import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from "rxjs";

import { Configuration } from '../../../app.config'

import { DataTableRequest } from '../model/datatable-request';
import { DatatableResponse } from '../model/datatable-response';
import { GroupMember } from '../model/group-member';

@Injectable()
export class GroupMemberService {
  
  constructor(private http: Http) { }

  pagingDataTable(request: DataTableRequest) : Observable<DatatableResponse<GroupMember>> {
    let pagedData = new DatatableResponse<GroupMember>();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${Configuration.API_ENDPOINT}/api/group-member/datatable`, request, { headers: headers })
    .map(responseData => {
      return responseData.json();
    })
    .map((data: DatatableResponse<GroupMember>) =>{
      return data;
    });
  }
}