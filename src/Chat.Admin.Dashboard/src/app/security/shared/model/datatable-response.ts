import {DataTableRequest} from './datatable-request'
export class DatatableResponse<T>{
    data = new Array<T>();
    page = new DataTableRequest();
}