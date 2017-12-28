import { Component } from '@angular/core';
//import * as $ from 'jquery';
var $ = require('jquery')
var dt = require('datatables.net')
@Component({
  selector: 'role',
  templateUrl: './role.component.html',
  styleUrls: [
    './role.component.scss',
    '../../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'
  ],
  providers: [
    
  ]
})
export class RoleComponent {
    constructor(){
      
    }
    ngAfterViewInit(){
      $('#example').DataTable();
    }
}